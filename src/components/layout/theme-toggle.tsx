import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("devtools-theme");
		const nextIsDark =
			savedTheme === "dark" ||
			(savedTheme === null &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList.toggle("dark", nextIsDark);
		setIsDark(nextIsDark);
	}, []);

	function toggleTheme() {
		const nextIsDark = !isDark;
		document.documentElement.classList.toggle("dark", nextIsDark);
		window.localStorage.setItem(
			"devtools-theme",
			nextIsDark ? "dark" : "light",
		);
		setIsDark(nextIsDark);
	}

	return (
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={toggleTheme}
			aria-label={isDark ? m.theme_light() : m.theme_dark()}
			className="rounded-full hover:bg-muted/50"
		>
			{isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
		</Button>
	);
}
