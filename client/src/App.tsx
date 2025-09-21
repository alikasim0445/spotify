import { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Container,
  CssBaseline, 
  Tab, 
  Tabs, 
  ThemeProvider, 
  Toolbar, 
  Typography,
  createTheme,
  Paper,
  useMediaQuery
} from '@mui/material';
import SongList from './components/SongList';
import Stats from './components/Stats';
import {
  MusicNote as MusicNoteIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';

// Import our styled components
import GlobalStyles from './styled-components/GlobalStyles';
import { Global } from '@emotion/react';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954', // Spotify green
    },
    secondary: {
      main: '#191414', // Spotify dark
    },
    background: {
      default: '#121212', // Dark background
      paper: '#181818',   // Slightly lighter for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Circular", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          minHeight: 64,
          '&.Mui-selected': {
            color: '#1DB954',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#1DB954',
          height: 4,
        },
      },
    },
  },
});

function App() {
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #000000 0%, #121212 100%)',
          color: 'white',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <MusicNoteIcon sx={{ mr: 1, color: '#1DB954' }} />
              <Typography variant="h6" component="div">
                Spotify Statistics
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #1DB954 30%, #1ed760 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Music Library
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Manage your songs and explore listening statistics
            </Typography>
          </Box>

          {/* Tabs Container */}
          <Paper 
            sx={{ 
              width: '100%', 
              mb: 3, 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered={!isMobile}
              variant={isMobile ? "fullWidth" : "standard"}
              sx={{ 
                '& .MuiTabs-flexContainer': {
                  justifyContent: isMobile ? 'space-between' : 'center'
                }
              }}
            >
              <Tab 
                icon={<MusicNoteIcon />} 
                iconPosition="start"
                label="Songs" 
                sx={{ 
                  color: tabValue === 0 ? '#1DB954' : 'inherit',
                  py: 2,
                  minHeight: 'auto'
                }} 
              />
              <Tab 
                icon={<AnalyticsIcon />} 
                iconPosition="start"
                label="Statistics" 
                sx={{ 
                  color: tabValue === 1 ? '#1DB954' : 'inherit',
                  py: 2,
                  minHeight: 'auto'
                }} 
              />
            </Tabs>
          </Paper>

          {/* Content Area */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
            {tabValue === 0 && <SongList />}
            {tabValue === 1 && <Stats />}
          </Box>
          
        </Container>

        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            textAlign: 'center',
            color: 'text.secondary',
            mt: 'auto'
          }}
        >
          <Typography variant="body2">
            Spotify Statistics &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;