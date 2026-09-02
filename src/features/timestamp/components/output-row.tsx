import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";

export function OutputRow({ label, value }: { label: string; value: string }) {
	const [copied, setCopied] = useState(false);
	async function copy() {
		await navigator.clipboard.writeText(value);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1_500);
	}
	return (
		<div className="group flex min-w-0 items-center gap-2 rounded-lg border border-border/40 bg-muted/20 px-3 py-2 transition-colors hover:bg-muted/30">
			<span className="w-24 shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
				{label}
			</span>
			<code
				className="min-w-0 flex-1 truncate text-xs font-medium sm:text-sm"
				title={value}
			>
				{value}
			</code>
			<Button
				size="icon-xs"
				variant="ghost"
				onClick={copy}
				aria-label={m.timestamp_copy_value({ label })}
				className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
			>
				{copied ? (
					<CheckIcon className="size-3" />
				) : (
					<ClipboardIcon className="size-3" />
				)}
			</Button>
		</div>
	);
}
