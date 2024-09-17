import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: 'rgba(255, 255, 255, 0.2)', 
          outlinedColor: '#fff', 
          softBg: 'rgba(255, 0, 0, 0.1)', 
          softHoverBg: 'rgba(255, 0, 0, 0.2)', 
          solidHoverBg: 'rgba(255, 255, 255, 0.3)', 
        },
        neutral: {
          solidBg: 'rgba(0, 0, 0, 0.2)', 
          solidHoverBg: 'rgba(0, 0, 0, 0.4)', 
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          boxShadow: 'none', 
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          },
        },
        outlined: {
          borderColor: '#fff', 
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          },
        },
        soft: {
          backgroundColor: 'rgba(255, 0, 0, 0.1)', 
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 0, 0.2)', 
          },
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          borderColor: '#fff', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          },
        },
      },
    },
  },
});

export default theme;
