import { Link } from "@tanstack/react-router";
import {
	Code2Icon,
	MenuIcon,
	SearchIcon,
	SquareTerminalIcon,
} from "lucide-react";

import {
	CommandPalette,
	useCommandPalette,
} from "#/components/layout/command-palette";
import { LanguageSwitcher } from "#/components/layout/language-switcher";
import { Sidebar } from "#/components/layout/sidebar";
import { ThemeToggle } from "#/components/layout/theme-toggle";
import { Button } from "#/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "#/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import * as m from "#/paraglide/messages.js";

export function TopNav() {
	const [commandOpen, setCommandOpen] = useCommandPalette();

	return (
		<>
			<header className="relative z-30 flex h-14 shrink-0 items-center border-b bg-background px-3 md:px-4">
				<div className="flex min-w-0 flex-1 items-center gap-2">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon-sm"
								className="md:hidden"
								aria-label={m.nav_open_menu()}
							>
								<MenuIcon />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-64 p-0">
							<SheetHeader className="border-b px-4 py-4">
								<SheetTitle className="flex items-center gap-2 text-left text-sm">
									<SquareTerminalIcon /> devtools.vn
								</SheetTitle>
							</SheetHeader>
							<Sidebar />
						</SheetContent>
					</Sheet>

					<Link
						to="/"
						className="flex items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
							<SquareTerminalIcon className="size-4" aria-hidden="true" />
						</span>
						<span className="hidden sm:inline">devtools.vn</span>
					</Link>
				</div>

				<Button
					variant="outline"
					size="sm"
					className="w-36 justify-start text-muted-foreground sm:w-52"
					onClick={() => setCommandOpen(true)}
				>
					<SearchIcon data-icon="inline-start" />
					<span className="truncate">{m.command_search()}</span>
					<kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-[0.625rem] sm:inline">
						⌘K
					</kbd>
				</Button>

				<div className="flex flex-1 items-center justify-end gap-0.5">
					<LanguageSwitcher />
					<ThemeToggle />
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon-sm" asChild>
								<a
									href="https://github.com/kinhdev24/devtools"
									target="_blank"
									rel="noreferrer"
									aria-label={m.nav_github()}
								>
									<Code2Icon />
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent>{m.nav_github()}</TooltipContent>
					</Tooltip>
				</div>
			</header>
			<CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
		</>
	);
}
