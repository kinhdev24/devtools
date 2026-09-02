import { Link } from "@tanstack/react-router";
import {
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
import { GithubIcon } from "#/components/icons/github";
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
			<header className="relative z-30 flex h-14 shrink-0 items-center border-b border-border/40 bg-background/95 backdrop-blur-md px-3 md:px-4 shadow-sm">
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
							<SheetHeader className="px-5 py-5">
								<SheetTitle className="flex items-center gap-2 text-left text-sm font-semibold">
									<div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background">
										<SquareTerminalIcon className="size-4" />
									</div>
									devtools.vn
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
					className="hidden w-full max-w-xs sm:flex sm:max-w-sm md:max-w-md lg:max-w-lg justify-start text-muted-foreground border-border/40 bg-muted/30 hover:bg-muted/60 transition-colors rounded-full px-4 h-8"
					onClick={() => setCommandOpen(true)}
				>
					<SearchIcon className="size-3.5 mr-1" />
					<span className="truncate text-xs font-medium">{m.command_search()}</span>
					<kbd className="ml-auto hidden rounded-full border border-border/40 bg-background/50 px-2 py-0.5 font-mono text-[10px] font-medium sm:inline">
						⌘K
					</kbd>
				</Button>

				<div className="flex flex-1 items-center justify-end gap-2">
					{/* Mobile search button */}
					<Button
						variant="ghost"
						size="icon-sm"
						className="sm:hidden h-8 w-8 rounded-full border border-border/40 bg-muted/30 hover:bg-muted/60"
						onClick={() => setCommandOpen(true)}
					>
						<SearchIcon className="size-4" />
					</Button>

					<div className="flex items-center gap-1 rounded-full border border-border/40 bg-muted/20 p-1">
						<LanguageSwitcher />
						<div className="h-4 w-px bg-border/40" />
						<ThemeToggle />
						<div className="h-4 w-px bg-border/40" />
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" className="rounded-full hover:bg-muted/50 h-8 w-8 sm:h-7 sm:w-auto sm:px-2.5 px-0 text-muted-foreground hover:text-foreground" asChild>
									<a
										href="https://github.com/kinhdev24/devtools"
										target="_blank"
										rel="noreferrer"
										aria-label={m.nav_github()}
									>
										<GithubIcon className="size-4 sm:size-3.5 sm:mr-1.5" />
										<span className="hidden sm:inline text-[11px] font-semibold tracking-wide">Star</span>
									</a>
								</Button>
							</TooltipTrigger>
							<TooltipContent>{m.nav_github()}</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</header>
			<CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
		</>
	);
}
