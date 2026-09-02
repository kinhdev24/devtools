import { Link } from "@tanstack/react-router";
import {
	ArrowLeftIcon,
	CircleDotDashedIcon,
	Settings2Icon,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "#/components/ui/empty";
import { Separator } from "#/components/ui/separator";
import type { ToolDefinition } from "#/config/tools";
import { getToolDescription, getToolName } from "#/lib/tool-messages";
import * as m from "#/paraglide/messages.js";

type ComingSoonPageProps = {
	item: Pick<
		ToolDefinition,
		"id" | "path" | "nameKey" | "descriptionKey" | "icon"
	>;
};

const buildSteps = [
	m.coming_plan_input,
	m.coming_plan_engine,
	m.coming_plan_output,
];

export function ComingSoonPage({ item }: ComingSoonPageProps) {
	const Icon = item.icon;
	const name = getToolName(item.nameKey);

	return (
		<Empty className="min-h-full rounded-none border-0 px-4 py-12 sm:px-8 lg:py-16">
			<EmptyHeader className="max-w-lg gap-3">
				<EmptyMedia
					variant="icon"
					className="size-12 border bg-background shadow-xs"
				>
					<Icon aria-hidden="true" />
				</EmptyMedia>
				<Badge variant="outline" className="font-mono uppercase tracking-wider">
					<CircleDotDashedIcon data-icon="inline-start" aria-hidden="true" />
					{m.coming_status()}
				</Badge>
				<EmptyTitle className="text-2xl sm:text-3xl">
					{m.coming_title({ tool: name })}
				</EmptyTitle>
				<EmptyDescription className="max-w-md">
					{getToolDescription(item.descriptionKey)}. {m.coming_description()}
				</EmptyDescription>
			</EmptyHeader>

			<EmptyContent className="max-w-xl">
				<Card className="w-full gap-0 overflow-hidden py-0 text-left">
					<CardHeader className="border-b bg-muted/35 py-4">
						<CardTitle className="font-mono text-xs font-medium tracking-wide">
							build://{item.id}
						</CardTitle>
						<CardDescription>{m.coming_plan_title()}</CardDescription>
						<CardAction>
							<Badge variant="secondary" className="font-mono">
								{m.coming_queued()}
							</Badge>
						</CardAction>
					</CardHeader>
					<CardContent className="space-y-5 py-5">
						<div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-xs">
							<span className="text-muted-foreground">
								{m.coming_route_label()}
							</span>
							<code className="justify-self-end font-mono text-foreground">
								{item.path}
							</code>
							<span className="text-muted-foreground">
								{m.coming_runtime_label()}
							</span>
							<span className="justify-self-end font-mono">
								{m.coming_runtime_value()}
							</span>
						</div>
						<Separator />
						<ol className="space-y-3">
							{buildSteps.map((step, index) => (
								<li key={step()} className="flex items-center gap-3 text-sm">
									<span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted/40 font-mono text-[10px] text-muted-foreground">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span>{step()}</span>
									<span
										className="ml-auto size-1.5 rounded-full bg-muted-foreground/35"
										aria-hidden="true"
									/>
								</li>
							))}
						</ol>
					</CardContent>
					<CardFooter className="border-t py-4">
						<Button asChild variant="ghost" size="sm" className="-ml-3">
							<Link to="/">
								<ArrowLeftIcon aria-hidden="true" />
								{m.coming_back_home()}
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</EmptyContent>
		</Empty>
	);
}

export const settingsComingSoonItem = {
	id: "settings",
	path: "/settings",
	nameKey: "settings.name",
	descriptionKey: "settings.description",
	icon: Settings2Icon,
};
