import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Link,
  Autocomplete,
  Alert,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch search suggestions when component mounts
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/crops/available');
        setSuggestions(response.data.crops);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };
    fetchSuggestions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/crops/search/${encodeURIComponent(searchTerm)}`);
      setResults(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error searching crops');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar position="fixed" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: '#2ECC71',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              🌱 NORI FARM
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button color="inherit" sx={{ color: '#333' }}>OUR SERVICE</Button>
            <Button color="inherit" sx={{ color: '#333' }}>MISSION</Button>
            <Button color="inherit" sx={{ color: '#333' }}>WHY</Button>
            <Button color="inherit" sx={{ color: '#333' }}>HOW</Button>
            <Button color="inherit" sx={{ color: '#333' }}>WHAT</Button>
            <Button color="inherit" sx={{ color: '#333' }}>CONTACT</Button>
          </Box>
          <Box>
            <Button sx={{ color: '#333' }}>EN</Button>
            <Button sx={{ color: '#333' }}>KO</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#2ECC71',
          minHeight: '100vh',
          pt: 8,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white', pr: { md: 8 }, mb: { xs: 4, md: 0 } }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 'bold',
                    mb: 3,
                    lineHeight: 1.2
                  }}
                >
                  BRING ALL FARMS IN YOUR HAND!
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Grow crops on Nori Farm App; get fresh harvest at your door
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSearch}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Autocomplete
                    fullWidth
                    freeSolo
                    options={suggestions}
                    value={searchTerm}
                    onChange={(event, newValue) => setSearchTerm(newValue || '')}
                    onInputChange={(event, newValue) => setSearchTerm(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search for crops..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            borderRadius: 2,
                            height: '56px',
                            '& fieldset': { border: 'none' }
                          }
                        }}
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading || !searchTerm}
                    sx={{
                      bgcolor: '#1a8d48',
                      height: '56px',
                      px: 4,
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#146c37'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH'}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto'
                  }
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80"
                  alt="Mobile app showcase"
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    zIndex: 1
                  }}
                >
                  🌱
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    zIndex: 1
                  }}
                >
                  🥕
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search Results */}
      {error && (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert
            severity="info"
            sx={{
              mb: 3,
              '& .MuiAlert-message': {
                fontSize: '1rem'
              }
            }}
          >
            {error}
          </Alert>
        </Container>
      )}

      {results.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={3}>
            {results.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={result.matchedProduct?.image}
                    alt={result.matchedProduct?.title}
                    sx={{
                      height: 200,
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#1a8d48',
                        fontWeight: 'bold',
                        mb: 2
                      }}
                    >
                      {result.crop}
                    </Typography>
                    {result.matchedProduct && (
                      <Box sx={{ mt: 'auto' }}>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            fontSize: '1.1rem'
                          }}
                        >
                          {result.matchedProduct.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            color: '#1a8d48',
                            fontWeight: 'bold'
                          }}
                        >
                          {result.matchedProduct.price}
                        </Typography>
                        <Button
                          variant="contained"
                          component={Link}
                          href={result.matchedProduct.buyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          fullWidth
                          sx={{
                            mt: 'auto',
                            bgcolor: '#1a8d48',
                            py: 1.5,
                            fontSize: '1rem',
                            '&:hover': {
                              bgcolor: '#146c37'
                            }
                          }}
                        >
                          Buy Now
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
}

export default App;
