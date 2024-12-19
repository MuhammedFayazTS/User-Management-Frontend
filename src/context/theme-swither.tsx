import { sidebarThemes, themes } from '@/constants/themes';
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
    sidebarTheme: SidebarTheme;
    setSidebarTheme: (theme: SidebarTheme) => void;
}

type Theme = 'red' | 'blue' | 'default';
type ThemeMode = "dark" | "light"
type SidebarTheme = 'default' | "transparent";

const applyThemeVariables = (theme: Theme, mode: ThemeMode) => {
    const selectedTheme = themes[theme]?.[mode] || themes.default[mode];

    const root = document.documentElement;

    Object.keys(selectedTheme).forEach((key) => {
        root.style.setProperty(key, selectedTheme[key as keyof typeof selectedTheme]);
    });
};

const applySidebarThemeVariables = (theme: SidebarTheme, mode: ThemeMode) => {
    const selectedTheme = sidebarThemes[theme]?.[mode] || themes.default[mode];

    const root = document.documentElement;

    Object.keys(selectedTheme).forEach((key) => {
        root.style.setProperty(key, selectedTheme[key as keyof typeof selectedTheme]);
    });
};

const initialState: ThemeSwitcherState = {
    theme: 'default',
    setTheme: () => { },
    sidebarTheme: 'default',
    setSidebarTheme: () => { },
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

    const [sidebarTheme, setSidebarTheme] = useState<SidebarTheme>(
        () => (localStorage.getItem(`${storageKey}-sidebar`) as SidebarTheme) || defaultTheme
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
        applySidebarThemeVariables(sidebarTheme, mode as unknown as ThemeMode);
    }, [theme, mode, sidebarTheme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
        sidebarTheme,
        setSidebarTheme: (newTheme: SidebarTheme) => {
            localStorage.setItem(`${storageKey}-sidebar`, newTheme);
            setSidebarTheme(newTheme);
        }
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
        throw new Error('useThemeSwitcher must be used within a ThemeSwitcherProviderContext');
    }
    return context;
};
