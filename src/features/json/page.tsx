import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToolWindow, ToolWindowHeader } from "#/components/layout/tool-window";
import * as m from "#/paraglide/messages.js";
import { Route } from "#/routes/json";
import { JsonInput } from "./components/json-input";
import { JsonOutput } from "./components/json-output";
import { JsonToolbar } from "./components/json-toolbar";
import type { JsonMode, JsonStatus } from "./types";
import { formatJson, minifyJson, parseJson } from "./utils/json";

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
	}, [initialInput, navigate]);

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
		<div className="relative flex h-full flex-col overflow-y-auto">
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
				{/* Floating Toolbar */}
				<div className="sticky top-0 z-10 -mx-2 px-2 py-2">
					<JsonToolbar
						status={status}
						errorMessage={errorMessage}
						output={output}
						onFormat={handleFormat}
						onMinify={handleMinify}
						onClear={handleClear}
						currentMode={mode}
					/>
				</div>

				{/* Editor Cards */}
				<div className="flex flex-1 flex-col gap-6 lg:flex-row lg:min-h-[500px]">
					{/* Input panel */}
					<ToolWindow className="flex-1 lg:min-h-0 min-h-[300px]">
						<ToolWindowHeader title="editor://json" />
						<JsonInput
							value={input}
							status={status}
							errorLine={!parseResult.ok ? parseResult.line : undefined}
							errorColumn={!parseResult.ok ? parseResult.column : undefined}
							onChange={setInput}
						/>
					</ToolWindow>

					{/* Output panel */}
					<ToolWindow className="flex-1 lg:min-h-0 min-h-[300px]">
						<ToolWindowHeader title="output://json" />
						<JsonOutput value={output} />
					</ToolWindow>
				</div>
			</div>
		</div>
	);
}
