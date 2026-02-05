"use client";

import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";

export const ThemeContext = createContext({
	isDarkMode: true,
	toggleTheme: () => {},
});

export const ThemeProvider = function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isDarkMode, setIsDarkMode] = useState(true);

	const toggleTheme = useCallback(function toggleTheme() {
		setIsDarkMode((prev) => !prev);
	}, []);

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = function useTheme() {
	return useContext(ThemeContext);
};
