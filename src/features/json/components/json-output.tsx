import * as m from "#/paraglide/messages.js";

type JsonOutputProps = {
	value: string;
};

export function JsonOutput({ value }: JsonOutputProps) {
	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex items-center border-b px-3 py-1.5">
				<span className="text-xs font-medium text-muted-foreground">
					{m.json_output_label()}
				</span>
			</div>
			<div className="relative min-h-0 flex-1 overflow-auto">
				{value ? (
					<pre
						id="json-output"
						aria-label={m.json_output_label()}
						className="h-full min-h-0 p-3 font-mono text-sm leading-relaxed text-foreground"
					>
						<SyntaxHighlight source={value} />
					</pre>
				) : (
					<p className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground/50">
						{m.json_empty_output()}
					</p>
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
