import { ClipboardIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";

type JwtInputProps = {
	value: string;
	onChange: (value: string) => void;
	onClear: () => void;
};

/**
 * Token input area with a colour-coded part preview beneath the textarea.
 *
 * Header  → blue
 * Payload → green
 * Signature → muted
 */
export function JwtInput({ value, onChange, onClear }: JwtInputProps) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		if (!value.trim()) return;
		await navigator.clipboard.writeText(value.trim());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	const parts = value.trim().split(".");
	const hasThreeParts = parts.length === 3;

	return (
		<div className="flex flex-col">
			{/* macOS / Terminal style header */}
			<div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-4 py-2.5">
				<div className="flex gap-1.5 opacity-80">
					<div className="size-2.5 rounded-full bg-destructive/60" />
					<div className="size-2.5 rounded-full bg-amber-500/60" />
					<div className="size-2.5 rounded-full bg-emerald-500/60" />
				</div>
				<span className="ml-2 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
					{m.jwt_input_label()}
				</span>
				
				{/* Action buttons */}
				{value && (
					<div className="ml-auto flex items-center gap-1">
						<Button
							id="jwt-copy-btn"
							size="icon-xs"
							variant="ghost"
							onClick={handleCopy}
							title={copied ? m.jwt_copy_done() : m.jwt_copy_token()}
							className="h-6 w-6 text-muted-foreground hover:text-foreground transition-transform hover:scale-105 active:scale-95"
						>
							<ClipboardIcon className="size-3.5" aria-hidden="true" />
						</Button>
						<Button
							id="jwt-clear-btn"
							size="icon-xs"
							variant="ghost"
							onClick={onClear}
							title={m.jwt_clear()}
							className="h-6 w-6 text-muted-foreground hover:text-destructive transition-transform hover:scale-105 active:scale-95"
						>
							<XIcon className="size-3.5" aria-hidden="true" />
						</Button>
					</div>
				)}
			</div>

			{/* Textarea */}
			<div className="relative bg-transparent">
				<textarea
					id="jwt-input"
					aria-label={m.jwt_input_label()}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={m.jwt_input_placeholder()}
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					rows={4}
					className="w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-relaxed text-foreground/90 outline-none placeholder:text-muted-foreground/30 selection:bg-blue-500/30"
				/>
			</div>

			{/* Colour-coded part preview */}
			{value.trim() && (
				<div className="border-t border-border/40 bg-muted/10 px-4 py-3">
					<p className="font-mono text-xs leading-relaxed break-all">
						{hasThreeParts ? (
							<>
								<span className="text-blue-500 dark:text-blue-400">
									{parts[0]}
								</span>
								<span className="text-muted-foreground">.</span>
								<span className="text-emerald-600 dark:text-emerald-400">
									{parts[1]}
								</span>
								<span className="text-muted-foreground">.</span>
								<span className="text-muted-foreground/60">{parts[2]}</span>
							</>
						) : (
							<span className="text-destructive">{value.trim()}</span>
						)}
					</p>
					{hasThreeParts && (
						<div className="mt-2 flex gap-4 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
							<span className="text-blue-500/80 dark:text-blue-400/80">header</span>
							<span className="text-emerald-600/80 dark:text-emerald-400/80">
								payload
							</span>
							<span className="opacity-70">signature</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
