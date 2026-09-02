import {
	ArrowRightIcon,
	FileUpIcon,
	LockKeyholeIcon,
	SparklesIcon,
} from "lucide-react";
import { type DragEvent, useId, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { tools } from "#/config/tools";
import { getToolDescription, getToolName } from "#/lib/tool-messages";
import * as m from "#/paraglide/messages.js";

function detectTool(value: string) {
	const input = value.trim();
	if (!input) return undefined;

	if (input.startsWith("{") || input.startsWith("[")) {
		try {
			JSON.parse(input);
			return tools.find((tool) => tool.id === "json");
		} catch {
			return undefined;
		}
	}

	if (input.split(".").length === 3 && input.length > 24)
		return tools.find((tool) => tool.id === "jwt");
	if (/^https?:\/\//i.test(input))
		return tools.find((tool) => tool.id === "text");
	if (/^\d{10,13}$/.test(input))
		return tools.find((tool) => tool.id === "timestamp");
	return tools.find((tool) => tool.id === "text");
}

export function HomePage() {
	const fileInputId = useId();
	const [value, setValue] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const detectedTool = useMemo(() => detectTool(value), [value]);
	const recentTools = ["json", "image", "jwt"]
		.map((id) => tools.find((tool) => tool.id === id))
		.filter(Boolean);

	function handleDrag(event: DragEvent<HTMLLabelElement>, active: boolean) {
		event.preventDefault();
		setIsDragging(active);
	}

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 sm:px-8 md:py-14 lg:px-12 relative">
			{/* Decorative background glow for the hero section */}
			<div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 opacity-20 dark:opacity-30 blur-[120px]" style={{
				background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
			}} />

			<section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
				<div className="flex flex-col gap-3 text-center items-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase backdrop-blur-md shadow-sm">
						<SparklesIcon className="size-3.5 text-primary" aria-hidden="true" />
						{m.home_eyebrow()}
					</div>
					<h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
						{m.home_title()}
					</h1>
					<p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
						{m.home_description()}
					</p>
				</div>

				<div className="flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-lg backdrop-blur-xl transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
					<label htmlFor="universal-input" className="sr-only">
						{m.home_input_label()}
					</label>
					<Textarea
						id="universal-input"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						placeholder={m.home_input_placeholder()}
						className="min-h-36 resize-none border-0 bg-transparent p-5 font-mono text-sm shadow-none focus-visible:ring-0 sm:min-h-40"
					/>
					<div className="flex min-h-12 flex-wrap items-center gap-3 border-t border-border/40 bg-muted/20 px-4 py-2.5">
						{detectedTool ? (
							<>
								<span className="flex min-w-0 flex-1 items-center gap-2.5 text-[13px] font-medium text-foreground">
									<div className="flex size-6 items-center justify-center rounded bg-primary/10 text-primary">
										<detectedTool.icon
											className="size-3.5 shrink-0"
											aria-hidden="true"
										/>
									</div>
									<span className="truncate">
										{m.home_detected({
											tool: getToolName(detectedTool.nameKey),
										})}
									</span>
								</span>
								<Button size="sm" className="h-8 rounded-full px-4 text-xs shadow-xs" asChild>
									{detectedTool.id === "json" ? (
										<Link to="/json" search={{ input: value }}>
											{m.home_open_tool({ tool: getToolName(detectedTool.nameKey) })}
											<ArrowRightIcon className="ml-1.5 size-3.5" />
										</Link>
									) : detectedTool.id === "jwt" ? (
										<Link to="/jwt" search={{ token: value }}>
											{m.home_open_tool({ tool: getToolName(detectedTool.nameKey) })}
											<ArrowRightIcon className="ml-1.5 size-3.5" />
										</Link>
									) : (
										<a href={detectedTool.path}>
											{m.home_open_tool({ tool: getToolName(detectedTool.nameKey) })}
											<ArrowRightIcon className="ml-1.5 size-3.5" />
										</a>
									)}
								</Button>
							</>
						) : (
							<span className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
								<SparklesIcon className="size-3.5" />
								{m.home_input_hint()}
							</span>
						)}
					</div>
				</div>

				<label
					htmlFor={fileInputId}
					className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/50 bg-card/30 px-6 py-6 text-center outline-none transition-all hover:border-primary/50 hover:bg-card/60 focus-within:ring-2 focus-within:ring-primary/20 backdrop-blur-sm"
					data-dragging={isDragging}
					onDragEnter={(event) => handleDrag(event, true)}
					onDragOver={(event) => handleDrag(event, true)}
					onDragLeave={(event) => handleDrag(event, false)}
					onDrop={(event) => handleDrag(event, false)}
				>
					<input id={fileInputId} type="file" className="sr-only" />
					<span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
						<FileUpIcon className="size-5" aria-hidden="true" />
					</span>
					<span className="flex flex-col gap-1">
						<span className="text-sm font-semibold text-foreground">
							{isDragging ? m.home_drop_active() : m.home_drop_title()}
						</span>
						<span className="text-[13px] text-muted-foreground">
							{m.home_drop_description()}
						</span>
					</span>
				</label>
			</section>

			<section aria-labelledby="recent-heading" className="flex flex-col gap-4 mt-4">
				<div className="flex items-end justify-between gap-4 border-b border-border/40 pb-3">
					<div className="flex flex-col gap-1.5">
						<h2 id="recent-heading" className="text-sm font-semibold tracking-tight">
							{m.home_recent()}
						</h2>
						<p className="text-xs text-muted-foreground">
							{m.home_recent_description()}
						</p>
					</div>
				</div>
				<div className="grid gap-3 sm:grid-cols-3">
					{recentTools.map((tool) => {
						if (!tool) return null;
						const Icon = tool.icon;
						return (
							<a
								key={tool.id}
								href={tool.path}
								className="group relative flex items-center gap-3 rounded-xl border border-border/40 bg-card/40 p-3.5 shadow-sm backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-md hover:border-border/80"
							>
								<div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50 shadow-sm transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
									<Icon className="size-4.5" aria-hidden="true" />
								</div>
								<span className="min-w-0 flex-1 flex flex-col gap-0.5">
									<span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
										{getToolName(tool.nameKey)}
									</span>
									<span className="block truncate text-[11px] text-muted-foreground/80">
										{getToolDescription(tool.descriptionKey)}
									</span>
								</span>
								<ArrowRightIcon
									className="size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:-translate-x-0.5"
									aria-hidden="true"
								/>
							</a>
						);
					})}
				</div>
			</section>

			<p className="flex items-center justify-center gap-2 mt-8 text-[11px] font-medium tracking-wide text-muted-foreground/60 uppercase">
				<LockKeyholeIcon
					className="size-3.5 shrink-0"
					aria-hidden="true"
				/>
				{m.home_local_note()}
			</p>
		</div>
	);
}
