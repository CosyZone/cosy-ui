export type Theme = 'light' | 'dark' | Record<string, string>;

export const themes = {
    light: {
        '--ui-primary-color': '#4a90e2',
        '--ui-secondary-color': '#f5f5f5',
        '--ui-background-color': '#ffffff',
        '--ui-text-color': '#333333',
    },
    dark: {
        '--ui-primary-color': '#60a5fa',
        '--ui-secondary-color': '#374151',
        '--ui-background-color': '#1a1a1a',
        '--ui-text-color': '#ffffff',
    },
} as const;

export const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    const themeValues = typeof theme === 'string' ? themes[theme] : theme;

    Object.entries(themeValues).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
}; 