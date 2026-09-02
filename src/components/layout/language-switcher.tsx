import { CheckIcon, LanguagesIcon } from "lucide-react";

import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import * as m from "#/paraglide/messages.js";
import { getLocale, type Locale, setLocale } from "#/paraglide/runtime.js";

export function LanguageSwitcher() {
	const locale = getLocale();

	function selectLocale(nextLocale: Locale) {
		if (nextLocale !== locale) setLocale(nextLocale);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm" aria-label={m.language_label()}>
					<LanguagesIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44">
				<DropdownMenuLabel>{m.language_label()}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => selectLocale("en")}>
						{m.language_english()}
						{locale === "en" && <CheckIcon className="ml-auto" />}
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => selectLocale("vi")}>
						{m.language_vietnamese()}
						{locale === "vi" && <CheckIcon className="ml-auto" />}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
