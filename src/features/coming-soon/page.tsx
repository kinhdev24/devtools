import { Link } from "@tanstack/react-router";
import {
	ArrowLeftIcon,
	CircleDotDashedIcon,
	Settings2Icon,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	CardContent,
	CardFooter,
	CardTitle,
} from "#/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "#/components/ui/empty";
import type { ToolDefinition } from "#/config/tools";
import { getToolDescription, getToolName } from "#/lib/tool-messages";
import * as m from "#/paraglide/messages.js";

type ComingSoonPageProps = {
	item: Pick<
		ToolDefinition,
		"id" | "path" | "nameKey" | "descriptionKey" | "icon"
	>;
};


export function ComingSoonPage({ item }: ComingSoonPageProps) {
	const Icon = item.icon;
	const name = getToolName(item.nameKey);

	return (
		<div className="relative flex h-full flex-col items-center justify-center px-4 overflow-hidden">
			{/* Decorative background glow */}
			<div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30 blur-[100px]" style={{
				background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
			}} />

			<Empty className="relative z-10 w-full max-w-2xl border-0 bg-transparent shadow-none">
				<EmptyHeader className="max-w-md gap-4 mx-auto">
					<div className="flex size-14 items-center justify-center rounded-2xl border border-border/40 bg-card/60 shadow-md backdrop-blur-xl">
						<Icon className="size-7 text-primary" aria-hidden="true" />
					</div>
					<Badge variant="outline" className="font-mono uppercase tracking-widest bg-background/50 backdrop-blur-md shadow-sm border-border/40 py-1 px-3">
						<CircleDotDashedIcon className="mr-2 size-3.5 text-primary animate-pulse" aria-hidden="true" />
						{m.coming_status()}
					</Badge>
					<EmptyTitle className="text-2xl font-bold tracking-tight text-balance">
						{m.coming_title({ tool: name })}
					</EmptyTitle>
					<EmptyDescription className="text-sm leading-relaxed text-balance text-muted-foreground/80">
						{getToolDescription(item.descriptionKey)}.
					</EmptyDescription>
				</EmptyHeader>

				<EmptyContent className="mt-8 w-full max-w-[420px] mx-auto">
					<div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-lg backdrop-blur-xl text-left">
						{/* Terminal Header */}
						<div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-4 py-3">
							<div className="flex gap-1.5">
								<div className="size-2.5 rounded-full bg-destructive/80" />
								<div className="size-2.5 rounded-full bg-amber-500/80" />
								<div className="size-2.5 rounded-full bg-emerald-500/80" />
							</div>
							<CardTitle className="ml-2 font-mono text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
								build://{item.id}
							</CardTitle>
							<Badge variant="secondary" className="ml-auto font-mono text-[9px] bg-primary/10 text-primary border-0 px-2 py-0.5">
								{m.coming_queued()}
							</Badge>
						</div>

						<CardContent className="p-5">
							<div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
								<span className="text-muted-foreground font-medium uppercase tracking-wider text-[10px] pt-1">
									{m.coming_route_label()}
								</span>
								<code className="justify-self-end font-mono text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">
									{item.path}
								</code>
								<span className="text-muted-foreground font-medium uppercase tracking-wider text-[10px] pt-0.5">
									{m.coming_runtime_label()}
								</span>
								<span className="justify-self-end font-mono text-foreground text-xs">
									{m.coming_runtime_value()}
								</span>
							</div>
						</CardContent>

						<CardFooter className="border-t border-border/40 bg-muted/10 p-4">
							<Button asChild variant="ghost" size="sm" className="rounded-full hover:bg-muted/50 w-full">
								<Link to="/">
									<ArrowLeftIcon className="mr-2 size-3.5" aria-hidden="true" />
									{m.coming_back_home()}
								</Link>
							</Button>
						</CardFooter>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}

export const settingsComingSoonItem = {
	id: "settings",
	path: "/settings",
	nameKey: "settings.name",
	descriptionKey: "settings.description",
	icon: Settings2Icon,
};
