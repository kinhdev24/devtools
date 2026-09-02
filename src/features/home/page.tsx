import {
	ArrowRightIcon,
	FileUpIcon,
	LockKeyholeIcon,
	SparklesIcon,
} from "lucide-react";
import { type DragEvent, useId, useMemo, useState } from "react";

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
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 sm:px-8 md:py-14 lg:px-12">
			<section className="mx-auto flex w-full max-w-2xl flex-col gap-5">
				<div className="flex flex-col gap-2">
					<p className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
						<SparklesIcon className="size-3.5" aria-hidden="true" />
						{m.home_eyebrow()}
					</p>
					<h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
						{m.home_title()}
					</h1>
					<p className="max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
						{m.home_description()}
					</p>
				</div>

				<div className="workbench-input">
					<label htmlFor="universal-input" className="sr-only">
						{m.home_input_label()}
					</label>
					<Textarea
						id="universal-input"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						placeholder={m.home_input_placeholder()}
						className="min-h-36 resize-none border-0 bg-transparent p-4 font-mono text-sm shadow-none focus-visible:ring-0 sm:min-h-40"
					/>
					<div className="flex min-h-11 flex-wrap items-center gap-2 border-t px-3 py-2">
						{detectedTool ? (
							<>
								<span className="flex min-w-0 flex-1 items-center gap-2 text-xs text-muted-foreground">
									<detectedTool.icon
										className="size-3.5 shrink-0"
										aria-hidden="true"
									/>
									<span className="truncate">
										{m.home_detected({
											tool: getToolName(detectedTool.nameKey),
										})}
									</span>
								</span>
								<Button size="xs" asChild>
									<a href={detectedTool.path}>
										{m.home_open_tool({
											tool: getToolName(detectedTool.nameKey),
										})}
										<ArrowRightIcon data-icon="inline-end" />
									</a>
								</Button>
							</>
						) : (
							<span className="text-xs text-muted-foreground">
								{m.home_input_hint()}
							</span>
						)}
					</div>
				</div>

				<label
					htmlFor={fileInputId}
					className="file-dropzone"
					data-dragging={isDragging}
					onDragEnter={(event) => handleDrag(event, true)}
					onDragOver={(event) => handleDrag(event, true)}
					onDragLeave={(event) => handleDrag(event, false)}
					onDrop={(event) => handleDrag(event, false)}
				>
					<input id={fileInputId} type="file" className="sr-only" />
					<span className="flex size-9 items-center justify-center rounded-md border bg-background">
						<FileUpIcon className="size-4" aria-hidden="true" />
					</span>
					<span className="flex flex-col gap-0.5">
						<span className="text-sm font-medium">
							{isDragging ? m.home_drop_active() : m.home_drop_title()}
						</span>
						<span className="text-xs text-muted-foreground">
							{m.home_drop_description()}
						</span>
					</span>
				</label>
			</section>

			<section aria-labelledby="recent-heading" className="flex flex-col gap-3">
				<div className="flex items-end justify-between gap-4 border-b pb-3">
					<div className="flex flex-col gap-1">
						<h2 id="recent-heading" className="text-sm font-semibold">
							{m.home_recent()}
						</h2>
						<p className="text-xs text-muted-foreground">
							{m.home_recent_description()}
						</p>
					</div>
				</div>
				<div className="grid gap-2 sm:grid-cols-3">
					{recentTools.map((tool) => {
						if (!tool) return null;
						const Icon = tool.icon;
						return (
							<a key={tool.id} href={tool.path} className="recent-tool">
								<Icon className="size-4 shrink-0" aria-hidden="true" />
								<span className="min-w-0 flex-1">
									<span className="block truncate text-sm font-medium">
										{getToolName(tool.nameKey)}
									</span>
									<span className="block truncate text-xs text-muted-foreground">
										{getToolDescription(tool.descriptionKey)}
									</span>
								</span>
								<ArrowRightIcon
									className="size-3.5 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</a>
						);
					})}
				</div>
			</section>

			<p className="flex items-start gap-2 border-t pt-4 text-xs leading-5 text-muted-foreground">
				<LockKeyholeIcon
					className="mt-0.5 size-3.5 shrink-0"
					aria-hidden="true"
				/>
				{m.home_local_note()}
			</p>
		</div>
	);
}
