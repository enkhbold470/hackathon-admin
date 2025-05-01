/**
 * Core Brand Color System (Admin Panel Theme)
 * Foundational palette for the admission panel UI.
 */
export const colorSystem = {
  /** Primary brand color – amber */
  primary: '#f59e0b', // Amber-500

  /** Secondary accent color – green success */
  secondary: '#10b981', // Green-500

  /** Main app background – dark slate */
  background: '#0f172a', // Dark navy slate

  /** Surface elements like cards, modals – white/gray */
  surface: '#ffffff',

  /** Error/destructive actions – vivid red */
  error: '#ef4444', // Tailwind's red-500
};

/**
 * Semantic and UI-Specific Colors
 */
const colors = {
  theme: {
    primary: colorSystem.primary,
    secondary: colorSystem.secondary,
    background: colorSystem.background,
    success: '#10b981', // green-500
    danger: colorSystem.error,
    warning: '#f59e0b', // amber-500
    info: '#0ea5e9',    // sky-500
    foreground: '#ffffff', // white text for dark mode
    inputBackground: 'rgba(255, 255, 255, 0.95)',
    inputBorder: 'transparent',
    inputText: '#1e293b',
    buttonText: '#ffffff',
    amber: {
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
    },
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      400: '#94a3b8',
      600: '#475569',
      700: '#334155',
    },
    slate: {
      800: '#1e293b',
      900: '#0f172a',
    },
    yellow: {
      600: '#ca8a04',
    },
    pending: {
      background: 'rgba(234, 179, 8, 0.15)',
      text: '#b45309',
    }
  },
  palette: {
    background: {
      gradient: {
        from: '#0f172a', // slate-900
        to: '#1e293b',  // slate-800
      },
      page: '#0f172a',
      card: '#ffffff',
      tableHeader: '#f8fafc', // gray-50
      tableRowHover: '#f8fafc',
    },
    foreground: {
      primary: '#ffffff',
      secondary: '#94a3b8', // gray-400
      muted: '#475569',    // gray-600
    },
    primary: '#f59e0b',
    secondary: '#10b981',
    accent: '#fbbf24', // amber-400
    button: {
      primary: '#f59e0b', // amber-500
      primaryHover: '#d97706', // amber-600
      success: '#10b981', // green-500
      neutral: '#f1f5f9', // gray-100
      neutralHover: '#e2e8f0', // gray-200
    }
  }
};

/**
 * Helper: Convert hex to HSL for CSS variables
 */
const hexToHsl = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  if (delta !== 0) {
    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const l = (cmax + cmin) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return `${h} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};

/**
 * CSS Variables (HSL-based for theming)
 */
export const cssVariables = {
  '--background': hexToHsl(colorSystem.background),
  '--foreground': '0 0% 100%', // white for dark theme
  '--card': '0 0% 100%', // white
  '--card-foreground': '222 47% 11%',
  '--popover': '0 0% 100%',
  '--popover-foreground': '222 47% 11%',
  '--primary': hexToHsl(colorSystem.primary),
  '--primary-foreground': '0 0% 100%',
  '--secondary': hexToHsl(colorSystem.secondary),
  '--secondary-foreground': '0 0% 100%',
  '--muted': '217 19% 27%', // slate-700
  '--muted-foreground': '215 20% 65%', // slate-400
  '--accent': '34 100% 56%', // amber-500
  '--accent-foreground': '0 0% 100%',
  '--destructive': hexToHsl(colorSystem.error),
  '--destructive-foreground': '0 0% 100%',
  '--border': '220 13% 91%', // gray-200
  '--input': '0 0% 100%',
  '--ring': '34 100% 56%', // amber-500
};

export const coreColors = colorSystem;
export default colors;
