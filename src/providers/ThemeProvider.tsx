"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
	theme: Theme;
	toggleTheme: (_v?: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	toggleTheme: () => {},
});

export const ThemeProvider = function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<Theme>("dark");
	const isDarkMode = theme === "dark";

	const toggleTheme = useCallback(function toggleTheme(v?: Theme) {
		setTheme((prev) => {
			if (typeof v !== "undefined") {
				return v;
			}
			return prev === "dark" ? "light" : "dark";
		});
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (event: MediaQueryListEvent) => {
			toggleTheme(event.matches ? "dark" : "light");
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [toggleTheme]);

	useEffect(() => {
		const body = document.querySelector("body");
		if (isDarkMode !== undefined) {
			if (isDarkMode) {
				body?.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				body?.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
		}
	}, [isDarkMode]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = function useTheme() {
	return useContext(ThemeContext);
};
