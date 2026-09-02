import { CheckIcon, ClipboardIcon, EraserIcon, WrapTextIcon, BracesIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";
import * as m from "#/paraglide/messages.js";
import type { JsonStatus, JsonMode } from "../types";

type JsonToolbarProps = {
	status: JsonStatus;
	errorMessage?: string;
	output: string;
	onFormat: () => void;
	onMinify: () => void;
	onClear: () => void;
	currentMode: JsonMode;
};

export function JsonToolbar({
	status,
	errorMessage,
	output,
	onFormat,
	onMinify,
	onClear,
	currentMode,
}: JsonToolbarProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		if (!output) return;
		try {
			await navigator.clipboard.writeText(output);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// clipboard access denied — silently ignore
		}
	}, [output]);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
				{/* Status badge */}
				<StatusBadge status={status} />

				{/* Error message */}
				{status === "invalid" && errorMessage && (
					<span className="min-w-0 flex-1 truncate text-xs text-destructive">
						{errorMessage}
					</span>
				)}

				<div className="ml-auto flex items-center gap-1">
					<Button
						id="json-format-btn"
						size="xs"
						variant={currentMode === "format" ? "secondary" : "ghost"}
						onClick={onFormat}
						disabled={status !== "valid"}
						title={m.json_format()}
					>
						<BracesIcon aria-hidden="true" />
						{m.json_format()}
					</Button>
					<Button
						id="json-minify-btn"
						size="xs"
						variant={currentMode === "minify" ? "secondary" : "ghost"}
						onClick={onMinify}
						disabled={status !== "valid"}
						title={m.json_minify()}
					>
						<WrapTextIcon aria-hidden="true" />
						{m.json_minify()}
					</Button>

					<Separator orientation="vertical" className="mx-1 h-4" />

					<Button
						id="json-copy-btn"
						size="xs"
						variant="ghost"
						onClick={handleCopy}
						disabled={!output}
						title={copied ? m.json_copy_done() : m.json_copy()}
					>
						{copied ? (
							<CheckIcon aria-hidden="true" />
						) : (
							<ClipboardIcon aria-hidden="true" />
						)}
						{copied ? m.json_copy_done() : m.json_copy()}
					</Button>
					<Button
						id="json-clear-btn"
						size="xs"
						variant="ghost"
						onClick={onClear}
						title={m.json_clear()}
					>
						<EraserIcon aria-hidden="true" />
						{m.json_clear()}
					</Button>
				</div>
			</div>
		</div>
	);
}

function StatusBadge({ status }: { status: JsonStatus }) {
	if (status === "idle") {
		return (
			<Badge
				variant="secondary"
				className="gap-1.5 font-mono text-[10px] tracking-wider uppercase"
			>
				<span
					className="size-1.5 rounded-full bg-muted-foreground/50"
					aria-hidden="true"
				/>
				{m.json_status_idle()}
			</Badge>
		);
	}

	if (status === "valid") {
		return (
			<Badge
				variant="secondary"
				className="gap-1.5 font-mono text-[10px] tracking-wider uppercase"
			>
				<span
					className="size-1.5 rounded-full bg-emerald-500"
					aria-hidden="true"
				/>
				{m.json_status_valid()}
			</Badge>
		);
	}

	return (
		<Badge
			variant="destructive"
			className="gap-1.5 font-mono text-[10px] tracking-wider uppercase"
		>
			<span
				className="size-1.5 rounded-full bg-destructive-foreground/60"
				aria-hidden="true"
			/>
			{m.json_status_invalid()}
		</Badge>
	);
}
