"use client";

import { useTheme } from "providers/ThemeProvider";
import { useEffect } from "react";
import { Moon, Sun } from "./Icons";

const ThemeToggler = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (event: MediaQueryListEvent) => {
			toggleTheme();
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
		<button
			type="button"
			aria-label="Toggle dark mode"
			className="ml-1 rounded-md p-2 hover:bg-skin-secondary-muted"
			onClick={toggleTheme}
		>
			{isDarkMode ? <Moon /> : <Sun />}
		</button>
	);
};

export default ThemeToggler;
