import * as m from "#/paraglide/messages.js";

type JsonOutputProps = {
	value: string;
};

export function JsonOutput({ value }: JsonOutputProps) {
	return (
		<div className="flex min-h-0 flex-1 flex-col">
			{/* macOS / Terminal style header */}
			<div className="flex items-center gap-2 border-b border-border/40 bg-muted/10 px-4 py-2.5">
				<div className="flex gap-1.5 opacity-50 grayscale">
					<div className="size-2.5 rounded-full bg-destructive/60" />
					<div className="size-2.5 rounded-full bg-amber-500/60" />
					<div className="size-2.5 rounded-full bg-emerald-500/60" />
				</div>
				<span className="ml-2 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
					{m.json_output_label()}
				</span>
			</div>
			<div className="min-h-0 flex-1 overflow-auto p-4">
				{value ? (
					<pre
						className="min-h-full font-mono text-[13px] leading-relaxed text-foreground/90 selection:bg-blue-500/30"
						style={{ tabSize: 2 }}
					>
						<code className="block">
							<SyntaxHighlight source={value} />
						</code>
					</pre>
				) : (
					<div className="flex h-full items-center justify-center text-sm text-muted-foreground/50">
						{m.json_empty_output()}
					</div>
				)}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Lightweight syntax highlighter — runs in the browser, zero dependencies
// ---------------------------------------------------------------------------

const TOKEN_RE =
	/("(?:[^"\\]|\\.)*")(\s*:)?|(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],])/g;

function SyntaxHighlight({ source }: { source: string }) {
	const nodes: React.ReactNode[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	TOKEN_RE.lastIndex = 0;

	while ((match = TOKEN_RE.exec(source)) !== null) {
		const [full, strRaw, colon, number, keyword, punctuation] = match;

		// Push any gap between matches as plain text
		if (match.index > lastIndex) {
			nodes.push(source.slice(lastIndex, match.index));
		}

		if (strRaw !== undefined) {
			if (colon) {
				// It's a key
				nodes.push(
					<span key={match.index} style={{ color: "var(--json-key)" }}>
						{strRaw}
					</span>,
				);
				nodes.push(colon);
			} else {
				// It's a string value
				nodes.push(
					<span key={match.index} style={{ color: "var(--json-string)" }}>
						{strRaw}
					</span>,
				);
			}
		} else if (number !== undefined) {
			nodes.push(
				<span key={match.index} style={{ color: "var(--json-number)" }}>
					{number}
				</span>,
			);
		} else if (keyword !== undefined) {
			nodes.push(
				<span key={match.index} style={{ color: "var(--json-keyword)" }}>
					{keyword}
				</span>,
			);
		} else if (punctuation !== undefined) {
			nodes.push(
				<span key={match.index} className="text-muted-foreground">
					{punctuation}
				</span>,
			);
		} else {
			nodes.push(full);
		}

		lastIndex = match.index + full.length;
	}

	// Any remaining text
	if (lastIndex < source.length) {
		nodes.push(source.slice(lastIndex));
	}

	return <>{nodes}</>;
}
