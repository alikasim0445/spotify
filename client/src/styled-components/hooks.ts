import { useTheme } from '@mui/material/styles';

// Custom hook for accessing theme values
export const useSpotifyTheme = () => {
  const theme = useTheme();
  
  return {
    ...theme,
    // Custom theme extensions
    spotify: {
      colors: {
        primary: '#1DB954',
        secondary: '#191414',
        background: '#121212',
        card: '#181818',
        text: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
        }
      },
      gradients: {
        primary: 'linear-gradient(45deg, #1DB954 30%, #1ed760 90%)',
        secondary: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
      },
      shadows: {
        card: '0 8px 32px rgba(0, 0, 0, 0.3)',
        hover: '0 12px 24px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '30px',
      }
    }
  };
};

// Custom hook for responsive values
export const useResponsive = () => {
  const theme = useTheme();
  
  return {
    isMobile: theme.breakpoints.down('sm'),
    isTablet: theme.breakpoints.between('sm', 'md'),
    isDesktop: theme.breakpoints.up('md'),
  };
};