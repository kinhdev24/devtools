import type { JsonParseResult } from "../types";

/**
 * Parse a raw JSON string and return either the parsed value or a structured error.
 * Extracts line/column from the browser's native SyntaxError message when possible.
 */
export function parseJson(input: string): JsonParseResult {
	if (!input.trim()) {
		return { ok: false, error: "Empty input" };
	}
	try {
		const data = JSON.parse(input);
		return { ok: true, data };
	} catch (err) {
		const message = err instanceof SyntaxError ? err.message : String(err);
		const { line, column } = extractPosition(message, input);
		return { ok: false, error: message, line, column };
	}
}

/**
 * Format JSON with a given indent (default 2 spaces).
 * Returns the formatted string or the original input on failure.
 */
export function formatJson(input: string, indent = 2): string {
	const result = parseJson(input);
	if (!result.ok) return input;
	return JSON.stringify(result.data, null, indent);
}

/**
 * Minify JSON to a single line.
 * Returns the minified string or the original input on failure.
 */
export function minifyJson(input: string): string {
	const result = parseJson(input);
	if (!result.ok) return input;
	return JSON.stringify(result.data);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Try to extract line/column numbers from a SyntaxError message.
 * Different browsers format messages differently; we handle the most common ones:
 *
 * Chrome/V8:  "Unexpected token ... at position N"
 * Firefox:    "JSON.parse: ... at line N column N"
 * Safari:     "JSON Parse error: Unexpected ... at line N"
 */
function extractPosition(
	message: string,
	input: string,
): { line?: number; column?: number } {
	// Firefox: "at line N column N"
	const ffMatch = message.match(/at line (\d+) column (\d+)/i);
	if (ffMatch) {
		return { line: Number(ffMatch[1]), column: Number(ffMatch[2]) };
	}

	// Chrome/V8: "at position N" — convert offset to line/column
	const v8Match = message.match(/at position (\d+)/i);
	if (v8Match) {
		return offsetToPosition(input, Number(v8Match[1]));
	}

	// Safari: "at line N" without column
	const safariMatch = message.match(/at line (\d+)/i);
	if (safariMatch) {
		return { line: Number(safariMatch[1]) };
	}

	return {};
}

function offsetToPosition(
	source: string,
	offset: number,
): { line: number; column: number } {
	const before = source.slice(0, offset);
	const lines = before.split("\n");
	return {
		line: lines.length,
		column: (lines.at(-1)?.length ?? 0) + 1,
	};
}
