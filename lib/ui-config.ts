import colors from './colors';

// Typography configuration
export const typography = {
  fontFamily: {
    base: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    decorative: '"Pacifico", cursive',
    formal: 'Georgia, serif',
    playful: '"Comic Sans MS", cursive'
  },
  fontSize: {
    // Desktop sizes
    formTitle: '2rem', // 32px
    sectionTitle: '1.5rem', // 24px
    questionTitle: '1rem', // 16px
    answerOption: '0.875rem', // 14px
    helperText: '0.75rem', // 12px
    buttonText: '0.875rem', // 14px
    
    // Mobile sizes
    mobile: {
      formTitle: '1.5rem', // 24px
      sectionTitle: '1.25rem', // 20px
      questionTitle: '0.875rem', // 14px
      answerOption: '0.875rem', // 14px
      helperText: '0.75rem', // 12px
      buttonText: '0.875rem' // 14px
    }
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  lineHeight: {
    tight: '1.2',
    base: '1.5',
    relaxed: '1.75'
  }
};

// Spacing configuration
export const spacing = {
  // Form element spacing
  formGap: '2rem',
  sectionGap: '1.5rem',
  questionGap: '1.25rem',
  inputGap: '0.5rem',
  
  // Padding and margins
  containerPadding: '1.5rem',
  sectionPadding: '1.5rem',
  inputPadding: {
    x: {
      left: '0.625rem', // pl-10 / 10px
      right: '1rem', // pr-4 / 16px
    },
    y: '0.75rem', // py-3 / 12px
  },
  buttonPadding: {
    x: '1rem', // px-4 / 16px
    y: '0.5rem', // py-2 / 8px
  },
  tableCellPadding: {
    x: '1.5rem', // px-6 / 24px
    y: '1rem', // py-4 / 16px
  },
  statusBadgePadding: {
    x: '0.75rem', // px-3 / 12px
    y: '0.25rem', // py-1 / 4px
  },
  
  // Page layout
  pageSpacing: '1.5rem', // px-6 py-6
  headerSpacing: {
    x: '1.5rem', // px-6
    y: '1.25rem', // py-5
  },
  
  // Mobile adjustments
  mobile: {
    formGap: '1.5rem',
    sectionGap: '1.25rem',
    questionGap: '1rem',
    containerPadding: '1rem',
    sectionPadding: '1rem',
    inputPadding: '0.625rem',
    buttonPadding: '0.625rem 1.25rem'
  }
};

// Input element sizes
export const inputSizes = {
  shortAnswer: {
    width: '100%',
    maxWidth: '100%',
    height: '36px'
  },
  searchInput: {
    width: '100%',
    height: '50px', // py-3 plus font size
  },
  paragraph: {
    width: '100%',
    maxWidth: '100%',
    minHeight: '100px'
  },
  checkbox: {
    size: '24px',
    spacing: '10px'
  },
  dropdown: {
    width: '100%',
    maxWidth: '100%',
    height: '40px'
  },
  radio: {
    size: '18px',
    spacing: '10px'
  },
  button: {
    height: '40px',
    actionButton: {
      height: '36px', // py-2 plus font size
      horizontalSpacing: '0.5rem', // gap-2
    },
    mainAction: {
      height: '40px',
    },
    mobile: {
      height: '48px'
    }
  },
  statusIndicator: {
    dotSize: '0.5rem', // w-2 h-2 / 8px
  }
};

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

// Border radius
export const borderRadius = {
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px'
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  header: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // shadow-md
  button: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
  buttonHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow
  card: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-xl
};

// Transitions
export const transitions = {
  default: 'all 0.2s ease-in-out',
  slow: 'all 0.3s ease-in-out',
  fast: 'all 0.1s ease-in-out',
  colors: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
  transform: 'transform 0.2s ease-in-out',
  shadow: 'box-shadow 0.2s ease-in-out',
};

// Layout configuration
export const layout = {
  maxWidth: '1280px',
  containerWidth: '100%',
  contentMargin: '0 auto',
  contentPadding: '1.5rem',
  formCardPadding: '1.5rem',
  tableBorderColor: 'rgba(0,0,0,0.06)',
  mobilePadding: '1rem'
};

// Admin panel specific components
export const adminComponents = {
  header: {
    height: '64px',
    backgroundColor: colors.theme.slate[900],
    textColor: '#ffffff',
    iconSize: '24px',
    iconColor: colors.theme.amber[400],
  },
  searchBar: {
    backgroundColor: colors.theme.slate[900],
    inputBackgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.md,
    iconColor: '#9ca3af', // text-gray-400
    iconSize: '18px',
  },
  table: {
    headerBackgroundColor: '#f8fafc', // bg-gray-50
    rowHoverBackgroundColor: '#f8fafc', // hover:bg-gray-50
    borderColor: 'rgba(0,0,0,0.06)',
    textColors: {
      header: '#374151', // text-gray-700
      primary: '#000000', // font-medium
      secondary: '#4b5563', // text-gray-600
    }
  },
  buttons: {
    primary: {
      backgroundColor: colors.theme.amber[600], // bg-amber-600
      hoverBackgroundColor: colors.theme.amber[500], // hover:bg-amber-500
      textColor: '#ffffff',
      fontSize: typography.fontSize.buttonText,
      borderRadius: borderRadius.md,
    },
    action: {
      accept: {
        backgroundColor: colors.theme.success,
        textColor: '#ffffff',
      },
      waitlist: {
        backgroundColor: colors.theme.warning,
        textColor: '#ffffff',
      },
      neutral: {
        backgroundColor: '#f3f4f6', // bg-gray-100
        hoverBackgroundColor: '#e5e7eb', // hover:bg-gray-200
        textColor: '#374151', // text-gray-700
      }
    }
  },
  statusBadge: {
    pending: {
      backgroundColor: 'rgba(234, 179, 8, 0.15)',
      textColor: '#b45309',
      dotColor: '#ca8a04', // bg-yellow-600
    }
  }
};

// Combined theme object
const uiConfig = {
  colors,
  typography,
  spacing,
  inputSizes,
  breakpoints,
  borderRadius,
  shadows,
  transitions,
  layout,
  adminComponents,
  
  // Current theme setting
  currentTheme: {
    fontStyle: 'base', // base, decorative, formal, playful
    colorScheme: 'dark' // changed from default to dark based on used colors
  }
};

export default uiConfig;
