export type JsonStatus = "idle" | "valid" | "invalid";

export type JsonParseResult =
	| { ok: true; data: unknown }
	| { ok: false; error: string; line?: number; column?: number };

export type JsonMode = "format" | "minify";
