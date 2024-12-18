import { themes } from '@/constants/themes';
import { useTheme } from '@/context/theme-provider';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeSwitcherProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeSwitcherState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

type Theme = 'red' | 'blue' | 'default';
type ThemeMode = "dark" | "light"

const applyThemeVariables = (theme: Theme, mode: ThemeMode) => {
    const selectedTheme = themes[theme]?.[mode] || themes.default[mode];

    const root = document.documentElement;

    Object.keys(selectedTheme).forEach((key) => {
        root.style.setProperty(key, selectedTheme[key as keyof typeof selectedTheme]);
    });
};

const initialState: ThemeSwitcherState = {
    theme: 'default',
    setTheme: () => { },
};

const ThemeSwitcherProviderContext = createContext<ThemeSwitcherState>(initialState);

export function ColorThemeProvider({
    children,
    defaultTheme = 'default',
    storageKey = 'app-color-theme',
}: ThemeSwitcherProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    const { theme: themMode } = useTheme()
    let mode = themMode || "dark"
    if (themMode === "system") {
        mode = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light"
    }

    useEffect(() => {
        applyThemeVariables(theme, mode as unknown as ThemeMode);
    }, [theme, mode]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <ThemeSwitcherProviderContext.Provider value={value}>
            {children}
        </ThemeSwitcherProviderContext.Provider>
    );
}

export const useThemeSwitcher = () => {
    const context = useContext(ThemeSwitcherProviderContext);
    if (!context) {
        throw new Error('useThemeSwitcher must be used within a ThemeProvider');
    }
    return context;
};
