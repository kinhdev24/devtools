import { CheckIcon, LanguagesIcon } from "lucide-react";

import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
				<Button variant="ghost" size="icon-sm" aria-label={m.language_label()} className="rounded-full hover:bg-muted/50">
					<LanguagesIcon className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44 rounded-xl border-border/40 shadow-sm backdrop-blur-md bg-popover/95 p-1.5">
				<DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2.5 py-1.5">
					{m.language_label()}
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-border/40" />
				<DropdownMenuGroup className="mt-1">
					<DropdownMenuItem className="rounded-md cursor-pointer" onSelect={() => selectLocale("en")}>
						{m.language_english()}
						{locale === "en" && <CheckIcon className="ml-auto" />}
					</DropdownMenuItem>
					<DropdownMenuItem className="rounded-md cursor-pointer mt-0.5" onSelect={() => selectLocale("vi")}>
						{m.language_vietnamese()}
						{locale === "vi" && <CheckIcon className="ml-auto" />}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
