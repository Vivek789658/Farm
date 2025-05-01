# Nori Farm Project

## Overview
Nori Farm is a modern web application that connects virtual farming with real-world products. Users can search for their virtual crops and find corresponding real products available for purchase.

## Features
- Modern, responsive UI with Material-UI
- Real-time search with autocomplete
- Product display with images and details
- Multi-language support (EN/KO)
- Professional animations and transitions

## Tech Stack
- Frontend: React.js, Material-UI
- Backend: Node.js, Express
- Database: MongoDB (mock data for testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Vivek789658/Farm.git
cd Farm
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Start the application:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm start
```

## Project Structure
```
farm/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── crops.js
│   ├── mockData.json
│   ├── server.js
│   └── package.json
└── README.md
```

## API Endpoints

### Get Available Crops
```
GET /api/crops/available
```

### Search Crops
```
GET /api/crops/search/:query
```

### Get Specific Crop
```
GET /api/crops/:identifier
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

## Contact
- GitHub: [Vivek789658](https://github.com/Vivek789658)
- Project Link: [https://github.com/Vivek789658/Farm](https://github.com/Vivek789658/Farm) 