const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Load mock data from JSON file
const mockDataPath = path.join(__dirname, '..', 'mockData.json');
const mockProducts = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

// Get available crops with search suggestions
router.get('/available', (req, res) => {
    const searchQuery = req.query.search?.toLowerCase() || '';

    // Get all searchable terms from the data
    const searchableTerms = mockProducts.reduce((terms, item) => {
        terms.push(item.crop);
        if (item.matchedProduct) {
            terms.push(item.matchedProduct.title);
        }
        return terms;
    }, []);

    // Filter terms based on search query
    const filteredTerms = searchableTerms.filter(term =>
        term.toLowerCase().includes(searchQuery)
    );

    res.json({
        message: 'Available items for search',
        crops: filteredTerms
    });
});

// Search crops
router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const searchQuery = query.toLowerCase();

        // Search through all fields
        const results = mockProducts.filter(item => {
            const cropMatch = item.crop.toLowerCase().includes(searchQuery);
            const titleMatch = item.matchedProduct?.title.toLowerCase().includes(searchQuery);
            const priceMatch = item.matchedProduct?.price.toLowerCase().includes(searchQuery);

            return cropMatch || titleMatch || priceMatch;
        });

        if (results.length === 0) {
            return res.status(404).json({
                message: 'No matches found. Try a different search term.'
            });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get crop by exact ID
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        // Find the crop in our mock database
        const crop = mockProducts.find(item => item.crop.toLowerCase() === identifier.toLowerCase());

        if (!crop) {
            return res.status(404).json({
                message: 'Crop not found. Please select a crop from the dropdown list.'
            });
        }

        // Return the exact format specified
        res.json(crop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new crop mapping (for testing)
router.post('/', async (req, res) => {
    try {
        const newCrop = req.body;

        // Validate the required format
        if (!newCrop.crop || !newCrop.matchedProduct) {
            return res.status(400).json({
                message: 'Invalid format. Required format:',
                example: {
                    crop: "Crop Name #ID",
                    matchedProduct: {
                        title: "Product Title",
                        price: "Price in KRW",
                        image: "Image URL",
                        buyLink: "Product URL"
                    }
                }
            });
        }

        // Check if crop already exists
        const existingIndex = mockProducts.findIndex(item => item.crop === newCrop.crop);
        if (existingIndex !== -1) {
            mockProducts[existingIndex] = newCrop;
        } else {
            mockProducts.push(newCrop);
        }

        // Save updated mock data
        fs.writeFileSync(mockDataPath, JSON.stringify(mockProducts, null, 2));

        res.status(201).json(newCrop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 