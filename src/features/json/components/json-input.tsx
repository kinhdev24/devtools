import { useRef } from "react";
import * as m from "#/paraglide/messages.js";
import type { JsonStatus } from "../types";

type JsonInputProps = {
	value: string;
	status: JsonStatus;
	errorLine?: number;
	errorColumn?: number;
	onChange: (value: string) => void;
};

export function JsonInput({
	value,
	status,
	errorLine,
	errorColumn,
	onChange,
}: JsonInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);

	// Sync scroll between textarea and backdrop
	const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
		if (backdropRef.current) {
			backdropRef.current.scrollTop = e.currentTarget.scrollTop;
			backdropRef.current.scrollLeft = e.currentTarget.scrollLeft;
		}
	};

	// Split value into lines for the backdrop
	const lines = value.split("\n");

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="relative min-h-0 flex-1 overflow-hidden bg-transparent">
				{/* Backdrop for highlights */}
				<div
					ref={backdropRef}
					aria-hidden="true"
					className="absolute inset-0 overflow-hidden break-normal whitespace-pre p-4 font-mono text-[13px] leading-relaxed text-transparent"
					style={{ pointerEvents: "none", tabSize: 2 }}
				>
					{lines.map((line, i) => {
						const isErrorLine = status === "invalid" && errorLine === i + 1;
						const lineKey = `line-${i}`;
						if (isErrorLine) {
							return (
								<div
									key={lineKey}
									className="relative -mx-4 px-4 w-[calc(100%+2rem)] min-w-max bg-destructive/15 text-transparent"
								>
									{line || " "}
									{/* Optional: red squiggly at column if known */}
									{errorColumn && (
										<span
											className="absolute bottom-0 left-0 h-0.5 bg-destructive px-4"
											style={{
												marginLeft: `calc(${errorColumn - 1}ch)`,
												width: "1ch",
											}}
										/>
									)}
								</div>
							);
						}
						return <div key={lineKey}>{line || " "}</div>;
					})}
				</div>

				{/* Actual textarea */}
				<textarea
					ref={textareaRef}
					id="json-input"
					aria-label={m.json_input_label()}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onScroll={handleScroll}
					placeholder={m.json_input_placeholder()}
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					data-status={status}
					style={{ tabSize: 2 }}
					className={[
						"absolute inset-0 resize-none break-normal whitespace-pre bg-transparent p-4 font-mono text-[13px] leading-relaxed outline-none transition-colors",
						"placeholder:text-muted-foreground/30",
						"text-foreground/90 selection:bg-blue-500/30",
					]
						.filter(Boolean)
						.join(" ")}
				/>
			</div>
		</div>
	);
}
