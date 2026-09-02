import { useRef } from "react";
import * as m from "#/paraglide/messages.js";
import type { JsonStatus } from "../types";

type JsonInputProps = {
	value: string;
	status: JsonStatus;
	onChange: (value: string) => void;
};

export function JsonInput({ value, status, onChange }: JsonInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex items-center border-b px-3 py-1.5">
				<span className="text-xs font-medium text-muted-foreground">
					{m.json_input_label()}
				</span>
			</div>
			<textarea
				ref={textareaRef}
				id="json-input"
				aria-label={m.json_input_label()}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={m.json_input_placeholder()}
				spellCheck={false}
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				data-status={status}
				className={[
					"min-h-0 flex-1 resize-none bg-transparent p-3 font-mono text-sm leading-relaxed outline-none",
					"placeholder:text-muted-foreground/50",
					"h-full w-full",
					status === "invalid" && value.trim()
						? "text-foreground"
						: "text-foreground",
				]
					.filter(Boolean)
					.join(" ")}
			/>
		</div>
	);
}
