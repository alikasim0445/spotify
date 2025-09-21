// Global Styles for the application
import { css } from '@emotion/react';

const GlobalStyles = css`
  /* Custom fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
  
  /* Base styles */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #121212;
    color: #ffffff;
    overflow-x: hidden;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #1db954;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #1ed760;
  }
  
  /* Selection styling */
  ::selection {
    background-color: rgba(29, 185, 84, 0.3);
  }
  
  /* Focus styles */
  *:focus {
    outline: 2px solid #1db954;
    outline-offset: 2px;
  }
  
  /* Smooth transitions */
  * {
    transition: background-color 0.3s ease, border-color 0.3s ease, 
      color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }
  
  /* Custom utility classes */
  .text-gradient {
    background: linear-gradient(45deg, #1DB954 30%, #1ed760 90%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .glass-effect {
    background: linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(25, 20, 20, 0.1) 100%);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* Input styles */
  input, textarea, select {
    &::placeholder {
      color: #b3b3b3;
    }
  }
  
  /* Button styles */
  button {
    cursor: pointer;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export default GlobalStyles;