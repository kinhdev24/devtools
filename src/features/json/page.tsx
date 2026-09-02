import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "#/routes/json";
import type { JsonMode, JsonStatus } from "./types";
import { formatJson, minifyJson, parseJson } from "./utils/json";
import { JsonInput } from "./components/json-input";
import { JsonOutput } from "./components/json-output";
import { JsonToolbar } from "./components/json-toolbar";
import * as m from "#/paraglide/messages.js";

export function JsonPage() {
	const { input: initialInput } = Route.useSearch();
	const navigate = useNavigate();
	const [input, setInput] = useState(initialInput ?? "");
	const [mode, setMode] = useState<JsonMode>("format");

	// Consume the search param once on mount, then clean up the URL
	useEffect(() => {
		if (initialInput) {
			navigate({ to: "/json", search: {}, replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // intentionally run once — initialInput is the seed value

	// Derive status and error from input — pure computation, no state
	const parseResult = useMemo(() => parseJson(input), [input]);

	const status: JsonStatus = useMemo(() => {
		if (!input.trim()) return "idle";
		return parseResult.ok ? "valid" : "invalid";
	}, [input, parseResult]);

	const errorMessage = useMemo(() => {
		if (parseResult.ok) return undefined;
		if (!input.trim()) return undefined;
		// Try to build a friendly "line X, col Y" message
		const { line, column } = parseResult;
		if (line != null && column != null) {
			return m.json_error_line({ line: String(line), column: String(column) });
		}
		return parseResult.error;
	}, [parseResult, input]);

	const output = useMemo(() => {
		if (!parseResult.ok || !input.trim()) return "";
		return mode === "minify" ? minifyJson(input) : formatJson(input);
	}, [parseResult, input, mode]);

	const handleFormat = useCallback(() => {
		setMode("format");
	}, []);

	const handleMinify = useCallback(() => {
		setMode("minify");
	}, []);

	const handleClear = useCallback(() => {
		setInput("");
		setMode("format");
	}, []);

	return (
		<div className="flex h-full flex-col overflow-hidden">
			{/* Toolbar */}
			<JsonToolbar
				status={status}
				errorMessage={errorMessage}
				output={output}
				onFormat={handleFormat}
				onMinify={handleMinify}
				onClear={handleClear}
				currentMode={mode}
			/>

			{/* Editor panels */}
			<div className="flex min-h-0 flex-1 divide-x overflow-hidden">
				{/* Input panel */}
				<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-background">
					<JsonInput value={input} status={status} onChange={setInput} />
				</div>

				{/* Output panel */}
				<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-muted/20">
					<JsonOutput value={output} />
				</div>
			</div>
		</div>
	);
}
