export type RegexFlag = "g" | "i" | "m" | "s" | "u" | "y";

export type RegexTestCase = {
	id: number;
	text: string;
};

export type RegexMatch = {
	index: number;
	value: string;
	groups: Array<string | undefined>;
};

export type RegexExplanation = {
	index: number;
	token: string;
	description: string;
};

export type RegexResult =
	| { ok: true; matches: RegexMatch[] }
	| { ok: false; error: string };
