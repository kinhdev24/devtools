import { BracesIcon, InfoIcon, ListTreeIcon } from "lucide-react";
import { ToolWindow, ToolWindowHeader } from "#/components/layout/tool-window";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Badge } from "#/components/ui/badge";
import * as m from "#/paraglide/messages.js";
import { getLocale } from "#/paraglide/runtime.js";
import type { RegexExplanation, RegexResult, RegexTestCase } from "../types";

const CHEATSHEET_EN = [
	[".", "Any character except newline"],
	["\\w", "Word character"],
	["\\d", "Digit"],
	["\\s", "Whitespace"],
	["*", "Zero or more"],
	["+", "One or more"],
	["?", "Zero or one"],
	["{n,m}", "Between n and m times"],
];
const CHEATSHEET_VI = [
	[".", "Ký tự bất kỳ, trừ ký tự xuống dòng"],
	["\\w", "Ký tự trong từ"],
	["\\d", "Chữ số"],
	["\\s", "Khoảng trắng"],
	["*", "Không hoặc nhiều lần"],
	["+", "Một hoặc nhiều lần"],
	["?", "Không hoặc một lần"],
	["{n,m}", "Từ n đến m lần"],
];

export function RegexInspector({
	testCase,
	result,
	explanation,
}: {
	testCase?: RegexTestCase;
	result?: RegexResult;
	explanation: RegexExplanation[];
}) {
	const cheatsheet = getLocale() === "vi" ? CHEATSHEET_VI : CHEATSHEET_EN;
	return (
		<ToolWindow className="flex min-h-0 flex-1 flex-col">
			<ToolWindowHeader title="inspector://regex" />
			<Tabs defaultValue="matches" className="flex min-h-0 flex-1 flex-col">
				<div className="border-b border-border/40 bg-muted/30 px-4 py-3 flex items-center">
					<TabsList className="h-9 p-1 bg-muted/50 border border-border/50 rounded-lg shadow-sm">
						<TabsTrigger
							value="matches"
							className="rounded-md px-3 font-medium text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
						>
							<BracesIcon className="size-3.5 mr-1.5" />
							{m.regex_tab_matches()}
						</TabsTrigger>
						<TabsTrigger
							value="explain"
							className="rounded-md px-3 font-medium text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
						>
							<ListTreeIcon className="size-3.5 mr-1.5" />
							{m.regex_tab_explain()}
						</TabsTrigger>
						<TabsTrigger
							value="cheatsheet"
							className="rounded-md px-3 font-medium text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
						>
							<InfoIcon className="size-3.5 mr-1.5" />
							{m.regex_tab_cheatsheet()}
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="matches" className="m-0 overflow-auto p-4">
					{!result && <Empty text={m.regex_select_test()} />}
					{result && !result.ok && (
						<p role="alert" className="font-mono text-sm text-destructive">
							{result.error}
						</p>
					)}
					{result?.ok && result.matches.length === 0 && (
						<Empty text={m.regex_no_matches()} />
					)}
					{result?.ok &&
						result.matches.map((match, matchIndex) => (
							<div
								key={`${match.index}-${match.value}`}
								className="mb-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm"
							>
								<div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2.5">
									<div className="flex items-center gap-3">
										<Badge variant="secondary" className="font-mono text-[10px]">
											{m.regex_match_number({ number: String(matchIndex + 1) })}
										</Badge>
										<span className="font-mono text-xs text-muted-foreground">
											Index: {match.index}–{match.index + match.value.length}
										</span>
									</div>
								</div>
								<div className="flex flex-col divide-y divide-border/40">
									{[match.value, ...match.groups].map((value, groupIndex) => (
										<div
											key={groupIndex === 0 ? "full" : `group-${groupIndex}`}
											className="grid grid-cols-[6rem_1fr] items-center gap-4 px-4 py-3 text-sm hover:bg-muted/5 transition-colors"
										>
											<span className="font-mono text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
												{groupIndex === 0
													? m.regex_full_match()
													: `${m.regex_group()} ${groupIndex}`}
											</span>
											<span className="break-all font-mono text-foreground">
												{value ?? <span className="text-muted-foreground/50 italic">undefined</span>}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					{testCase && result?.ok && result.matches.length > 0 && (
						<HighlightedText text={testCase.text} result={result} />
					)}
				</TabsContent>
				<TabsContent value="explain" className="m-0 overflow-auto p-4">
					<div className="flex flex-col gap-3 font-mono text-xs">
						{explanation.map((item) => (
							<div
								key={`${item.index}-${item.token}`}
								className="grid grid-cols-[minmax(3rem,auto)_1fr] gap-4"
							>
								<code className="text-primary">{item.token}</code>
								<span className="text-muted-foreground">
									{item.description}
								</span>
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value="cheatsheet" className="m-0 overflow-auto p-4">
					<ul className="flex flex-col gap-2">
						{cheatsheet.map(([token, description]) => (
							<li
								key={token}
								className="flex justify-between gap-4 border-b border-border/40 pb-2 text-sm"
							>
								<code className="text-primary">{token}</code>
								<span className="text-right text-muted-foreground">
									{description}
								</span>
							</li>
						))}
					</ul>
				</TabsContent>
			</Tabs>
		</ToolWindow>
	);
}

function Empty({ text }: { text: string }) {
	return (
		<p className="py-8 text-center text-sm text-muted-foreground">{text}</p>
	);
}

function HighlightedText({
	text,
	result,
}: {
	text: string;
	result: Extract<RegexResult, { ok: true }>;
}) {
	const parts: React.ReactNode[] = [];
	let cursor = 0;
	for (const match of result.matches) {
		parts.push(text.slice(cursor, match.index));
		parts.push(
			<mark
				key={`${match.index}-${cursor}`}
				className="rounded-sm bg-blue-500/20 px-1 text-blue-900 dark:text-blue-200 dark:bg-blue-500/30"
			>
				{match.value || "\u200b"}
			</mark>,
		);
		cursor = match.index + match.value.length;
	}
	parts.push(text.slice(cursor));
	return (
		<div className="mt-4 rounded-xl border border-border/50 bg-card p-4 font-mono text-sm leading-relaxed tracking-wide shadow-sm break-all text-foreground/80">
			{parts}
		</div>
	);
}
