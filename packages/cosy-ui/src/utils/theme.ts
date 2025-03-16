interface ThemeManager {
    updateActiveTheme: (currentTheme: string) => void;
    handleThemeClick: (this: HTMLElement) => void;
    initialize: () => void;
    setTheme: (theme: string) => void;
}

export function createThemeManager(): ThemeManager {
    const getThemeItems = () => document.querySelectorAll<HTMLElement>('[data-set-theme]');

    const updateActiveTheme = (currentTheme: string) => {
        const themeItems = getThemeItems();
        themeItems.forEach((item) => {
            const themeId = item.getAttribute('data-set-theme');
            const isActive = themeId === currentTheme;
            item.classList.toggle('bg-primary', isActive);
            item.classList.toggle('text-primary-content', isActive);
        });
    };

    function handleThemeClick(this: HTMLElement) {
        const theme = this.getAttribute('data-set-theme');
        document.documentElement.setAttribute('data-theme', theme ?? 'default');
        localStorage.setItem('theme', theme ?? 'default');
        updateActiveTheme(theme ?? 'default');
    }

    const setTheme = (theme: string) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateActiveTheme(theme);
    };

    const initialize = () => {
        const themeItems = getThemeItems();

        // 移除旧的事件监听器并添加新的
        themeItems.forEach((item) => {
            item.removeEventListener('click', handleThemeClick);
            item.addEventListener('click', handleThemeClick);
        });

        // 从本地存储中获取主题并更新激活状态
        const savedTheme = localStorage.getItem('theme') || 'default';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateActiveTheme(savedTheme);
    };

    return {
        updateActiveTheme,
        handleThemeClick,
        initialize,
        setTheme,
    };
} 