import { useEffect } from 'react';
import { ThemeConfig } from '../types/portfolio';

interface ThemeProviderProps {
  theme: ThemeConfig;
  children: React.ReactNode;
}

// Convert hex color to RGB values
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '37, 99, 235'; // fallback blue
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r} ${g} ${b}`;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    // Inject CSS custom properties into the document
    const root = document.documentElement;
    
    // Set CSS variables
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-primary-rgb', hexToRgb(theme.primaryColor));
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-secondary-rgb', hexToRgb(theme.secondaryColor));
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-accent-rgb', hexToRgb(theme.accentColor));
    root.style.setProperty('--color-background', theme.backgroundColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--font-family', theme.fontFamily);

    // Set body styles
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    document.body.style.fontFamily = theme.fontFamily;
  }, [theme]);

  return <>{children}</>;
}

