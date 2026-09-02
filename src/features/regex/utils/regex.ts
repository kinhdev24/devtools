import type {
	RegexExplanation,
	RegexFlag,
	RegexMatch,
	RegexResult,
} from "../types";

export function evaluateRegex(
	pattern: string,
	flags: RegexFlag[],
	text: string,
): RegexResult {
	try {
		const requestedFlags = flags.join("");
		const scanFlags = requestedFlags.includes("g")
			? requestedFlags
			: `${requestedFlags}g`;
		const regex = new RegExp(pattern, scanFlags);
		const matches: RegexMatch[] = [];

		for (const match of text.matchAll(regex)) {
			matches.push({
				index: match.index ?? 0,
				value: match[0],
				groups: Array.from(match).slice(1),
			});
			if (!requestedFlags.includes("g")) break;
		}

		return { ok: true, matches };
	} catch (error) {
		return {
			ok: false,
			error:
				error instanceof Error ? error.message : "Invalid regular expression",
		};
	}
}

export function explainRegex(
	pattern: string,
	locale: string,
): RegexExplanation[] {
	const explanations: RegexExplanation[] = [];
	let index = 0;

	while (index < pattern.length) {
		const rest = pattern.slice(index);
		const characterClass = rest.match(/^\[(?:\\.|[^\]])*\]/)?.[0];
		const quantifier = rest.match(/^\{\d+(?:,\d*)?\}/)?.[0];
		const groupStart = rest.match(/^\(\?(?:<[^>]+>|[:=!]|<[=!])/i)?.[0];
		const escaped = rest.match(/^\\[dDsSwWbB]/)?.[0];
		const token =
			characterClass ?? quantifier ?? groupStart ?? escaped ?? rest[0];

		explanations.push({
			index,
			token,
			description: describeToken(token, locale === "vi"),
		});
		index += token.length;
	}

	return explanations;
}

function describeToken(token: string, vietnamese: boolean): string {
	if (token.startsWith("["))
		return vietnamese ? "Lớp ký tự" : "Character class";
	if (token.startsWith("{"))
		return vietnamese ? "Khoảng lặp" : "Repetition range";
	if (
		token.startsWith("(?<") &&
		!token.startsWith("(?<=") &&
		!token.startsWith("(?<!")
	)
		return "Named capture group";
	if (token === "(?:") return "Non-capturing group";
	if (token === "(?=") return "Positive lookahead";
	if (token === "(?!") return "Negative lookahead";
	if (token === "(?<=") return "Positive lookbehind";
	if (token === "(?<!") return "Negative lookbehind";
	const descriptions: Record<string, string> = {
		"^": "Start of input or line",
		$: "End of input or line",
		".": "Any character except line terminators",
		"*": "Zero or more times",
		"+": "One or more times",
		"?": "Zero or one time; may also make a quantifier lazy",
		"|": "Alternative",
		"(": "Start capture group",
		")": "End group",
		"\\d": "Digit",
		"\\D": "Non-digit",
		"\\w": "Word character",
		"\\W": "Non-word character",
		"\\s": "Whitespace",
		"\\S": "Non-whitespace",
		"\\b": "Word boundary",
		"\\B": "Non-word boundary",
	};
	const vietnameseDescriptions: Record<string, string> = {
		"^": "Đầu chuỗi hoặc đầu dòng",
		$: "Cuối chuỗi hoặc cuối dòng",
		".": "Ký tự bất kỳ, trừ ký tự xuống dòng",
		"*": "Lặp không hoặc nhiều lần",
		"+": "Lặp một hoặc nhiều lần",
		"?": "Lặp không hoặc một lần; cũng có thể làm bộ lặp thành không tham lam",
		"|": "Lựa chọn thay thế",
		"(": "Bắt đầu nhóm bắt giữ",
		")": "Kết thúc nhóm",
		"\\d": "Chữ số",
		"\\D": "Ký tự không phải chữ số",
		"\\w": "Ký tự trong từ",
		"\\W": "Ký tự không thuộc từ",
		"\\s": "Khoảng trắng",
		"\\S": "Ký tự không phải khoảng trắng",
		"\\b": "Ranh giới từ",
		"\\B": "Không phải ranh giới từ",
	};
	return vietnamese
		? (vietnameseDescriptions[token] ?? "Ký tự nguyên văn")
		: (descriptions[token] ?? "Literal character");
}
