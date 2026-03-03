"use client";

import { useTheme } from "providers/ThemeProvider";
import { useWebHaptics } from "web-haptics/react";
import { Moon, Sun } from "./Icons";

const ThemeToggler = () => {
	const { theme, toggleTheme } = useTheme();
	const { trigger } = useWebHaptics();

	return (
		<button
			type="button"
			aria-label="Toggle dark mode"
			className="ml-1 rounded-md p-2 hover:bg-skin-secondary-muted"
			onClick={() => {
				toggleTheme();
				trigger();
			}}
		>
			{theme === "dark" ? <Moon /> : <Sun />}
		</button>
	);
};

export default ThemeToggler;
