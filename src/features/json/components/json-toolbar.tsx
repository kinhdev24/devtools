import {
	BracesIcon,
	CheckIcon,
	ClipboardIcon,
	EraserIcon,
	WrapTextIcon,
} from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";
import type { JsonMode, JsonStatus } from "../types";

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
			<div className="flex flex-wrap items-center gap-3 rounded-full border border-border/40 bg-background/80 px-4 py-2.5 shadow-sm backdrop-blur-md transition-shadow">
				{/* Status badge */}
				<StatusBadge status={status} />

				{/* Error message */}
				{status === "invalid" && errorMessage && (
					<span className="min-w-0 flex-1 truncate text-[11px] font-medium text-destructive">
						{errorMessage}
					</span>
				)}

				<div className="ml-auto flex items-center gap-1.5">
					<Button
						id="json-format-btn"
						size="sm"
						variant={currentMode === "format" ? "secondary" : "ghost"}
						onClick={onFormat}
						disabled={status !== "valid"}
						title={m.json_format()}
						className="h-7 rounded-full text-xs font-medium transition-transform hover:scale-105 active:scale-95"
					>
						<BracesIcon className="size-3.5" aria-hidden="true" />
						{m.json_format()}
					</Button>
					<Button
						id="json-minify-btn"
						size="sm"
						variant={currentMode === "minify" ? "secondary" : "ghost"}
						onClick={onMinify}
						disabled={status !== "valid"}
						title={m.json_minify()}
						className="h-7 rounded-full text-xs font-medium transition-transform hover:scale-105 active:scale-95"
					>
						<WrapTextIcon className="size-3.5" aria-hidden="true" />
						{m.json_minify()}
					</Button>

					<div className="mx-1 h-4 w-px bg-border" />

					<Button
						id="json-copy-btn"
						size="sm"
						variant="ghost"
						onClick={handleCopy}
						disabled={!output}
						title={copied ? m.json_copy_done() : m.json_copy()}
						className="h-7 rounded-full text-xs font-medium transition-transform hover:scale-105 active:scale-95"
					>
						{copied ? (
							<CheckIcon
								className="size-3.5 text-emerald-500"
								aria-hidden="true"
							/>
						) : (
							<ClipboardIcon className="size-3.5" aria-hidden="true" />
						)}
						{copied ? m.json_copy_done() : m.json_copy()}
					</Button>
					<Button
						id="json-clear-btn"
						size="sm"
						variant="ghost"
						onClick={onClear}
						title={m.json_clear()}
						className="h-7 rounded-full text-xs font-medium text-muted-foreground hover:text-destructive transition-transform hover:scale-105 active:scale-95"
					>
						<EraserIcon className="size-3.5" aria-hidden="true" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function StatusBadge({ status }: { status: JsonStatus }) {
	if (status === "idle") {
		return (
			<div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
				<span
					className="size-1.5 rounded-full bg-muted-foreground/40"
					aria-hidden="true"
				/>
				{m.json_status_idle()}
			</div>
		);
	}

	if (status === "valid") {
		return (
			<div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
				<div className="relative flex size-1.5 items-center justify-center">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
					<span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
				</div>
				{m.json_status_valid()}
			</div>
		);
	}

	return (
		<div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-destructive uppercase">
			<span
				className="size-1.5 rounded-full bg-destructive"
				aria-hidden="true"
			/>
			{m.json_status_invalid()}
		</div>
	);
}
