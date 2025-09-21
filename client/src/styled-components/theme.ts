// Theme definitions for consistent styling
export const colors = {
  primary: {
    main: '#1DB954', // Spotify green
    light: '#1ed760',
    dark: '#189c46',
  },
  secondary: {
    main: '#191414', // Spotify dark
    light: '#2a2424',
    dark: '#0a0909',
  },
  background: {
    default: '#121212', // Dark background
    paper: '#181818',   // Slightly lighter for cards
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
  },
  grey: {
    100: '#121212',
    200: '#181818',
    300: '#282828',
    400: '#535353',
    500: '#b3b3b3',
  }
};

export const gradients = {
  primary: 'linear-gradient(45deg, #1DB954 30%, #1ed760 90%)',
  secondary: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
  glass: 'linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(25, 20, 20, 0.1) 100%)'
};

export const shadows = {
  light: '0 4px 12px rgba(0, 0, 0, 0.1)',
  medium: '0 8px 16px rgba(0, 0, 0, 0.2)',
  heavy: '0 12px 24px rgba(0, 0, 0, 0.3)',
  primary: '0 4px 12px rgba(29, 185, 84, 0.3)'
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  pill: '30px',
  circle: '50%'
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
};

export const typography = {
  fontFamily: '"Montserrat", "Circular", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '3rem',
    fontWeight: 800,
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  button: {
    fontSize: '1rem',
    fontWeight: 600,
  }
};

export const transitions = {
  default: 'all 0.3s ease',
  fast: 'all 0.2s ease',
  slow: 'all 0.4s ease'
};

export const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};