export const colors = {
  light: {
    background: '#0A0A0A',
    surface: '#1E1E1E',
    surfaceGlass: '#202020',
    blurBackground: '#171717',
    primary: '#4F8CFF',
    secondary: '#7C5CFF',
    accent: '#7C5CFF', // Alias for secondary in old code
    info: '#4F8CFF',
    text: '#FFFFFF',
    textSecondary: '#A3A3A3', // Light Gray
    border: 'rgba(255,255,255,0.08)',
    borderGlass: 'rgba(255,255,255,0.08)',
    error: '#EF4444', // Keeping standard error
    success: '#4CAF50',
    warning: '#FFB300',
    // Backward compatibility for existing UI
    backgroundElement: '#1E1E1E',
    backgroundSelected: '#252525',
    glassBorder: 'rgba(255,255,255,0.08)',
    gradientBg: ['#4F8CFF', '#7C5CFF'],
  },
  dark: {
    background: '#0A0A0A',
    surface: '#1E1E1E',
    surfaceGlass: '#202020',
    blurBackground: '#171717',
    primary: '#4F8CFF',
    secondary: '#7C5CFF',
    accent: '#7C5CFF',
    info: '#4F8CFF',
    text: '#FFFFFF',
    textSecondary: '#A3A3A3',
    border: 'rgba(255,255,255,0.08)',
    borderGlass: 'rgba(255,255,255,0.08)',
    error: '#EF4444',
    success: '#4CAF50',
    warning: '#FFB300',
    // Backward compatibility
    backgroundElement: '#1E1E1E',
    backgroundSelected: '#252525',
    glassBorder: 'rgba(255,255,255,0.08)',
    gradientBg: ['#4F8CFF', '#7C5CFF'],
  },
  gradients: {
    premium: ['#4F8CFF', '#7C5CFF'], // Blue to Purple
    purple: ['#7C5CFF', '#4B0082'],
    gold: ['#FFB300', '#FFA500'],
  }
};

export type ThemeColors = typeof colors.dark;
