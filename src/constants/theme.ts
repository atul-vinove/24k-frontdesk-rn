
export const theme = {
  colors: {
    // Primary colors - 24Karat gold branding
    primary: '#FFD700',
    primaryLight: '#FFED4E',
    primaryDark: '#B8860B',
    
    // Background colors
    background: '#0F0F0F',
    secondary: '#1A1A1A',
    tertiary: '#2A2A2A',
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#E0E0E0',
    subtleText: '#B0B0B0',
    
    // Border colors
    border: '#404040',
    borderLight: '#333333',
    
    // Status colors
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',

    white: '#FFFFFF',
    black: '#000000',
  },
  
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 44,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 36,
    },
    h3: {
      fontSize: 22,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 18,
    },
  },
  
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 56,
  },
  
  borderRadius: {
    none: 0,
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export default theme;
