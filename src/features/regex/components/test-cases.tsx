import { PlusIcon, Trash2Icon } from "lucide-react";
import { ToolWindow, ToolWindowHeader } from "#/components/layout/tool-window";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import * as m from "#/paraglide/messages.js";
import type { RegexResult, RegexTestCase } from "../types";

export function TestCases({
	testCases,
	results,
	selectedId,
	onSelect,
	onChange,
	onAdd,
	onRemove,
}: {
	testCases: RegexTestCase[];
	results: Map<number, RegexResult>;
	selectedId: number;
	onSelect: (id: number) => void;
	onChange: (id: number, text: string) => void;
	onAdd: () => void;
	onRemove: (id: number) => void;
}) {
	return (
		<ToolWindow className="flex min-h-0 flex-1 flex-col">
			<ToolWindowHeader title="tests://regex" />
			<div className="flex min-h-0 flex-1 flex-col">
				<div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-4 py-2.5">
					<span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
						{m.regex_tests_label()}
					</span>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 px-2 font-mono text-[10px] uppercase"
						onClick={onAdd}
					>
						<PlusIcon data-icon="inline-start" />
						{m.regex_tests_add()}
					</Button>
				</div>
				<div className="flex flex-1 flex-col gap-3 overflow-auto p-4">
					{testCases.length === 0 && (
						<p className="py-8 text-center text-sm text-muted-foreground">
							{m.regex_tests_empty()}
						</p>
					)}
					{testCases.map((test) => {
						const result = results.get(test.id);
						const matches = result?.ok ? result.matches : [];
						return (
							<div
								key={test.id}
								className={`group rounded-lg border bg-card p-3 shadow-sm ${selectedId === test.id ? "border-primary/40" : "border-border/40"}`}
							>
								<div className="mb-2 flex items-center justify-between">
									<Badge
										variant="outline"
										className={`text-[10px] font-mono px-1.5 h-4 uppercase border-transparent ${
											result?.ok && matches.length > 0
												? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
												: "bg-destructive/15 text-destructive hover:bg-destructive/20"
										}`}
									>
										{result?.ok && matches.length > 0
											? m.regex_match_badge()
											: m.regex_nomatch_badge()}
									</Badge>
									<Button
										variant="ghost"
										size="icon"
										className="size-6 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
										aria-label={m.regex_tests_remove()}
										onClick={(event) => {
											event.stopPropagation();
											onRemove(test.id);
										}}
									>
										<Trash2Icon />
									</Button>
								</div>
								<Input
									value={test.text}
									onFocus={() => onSelect(test.id)}
									onChange={(event) => onChange(test.id, event.target.value)}
									placeholder={m.regex_test_placeholder()}
									className="h-9 font-mono border-0 bg-transparent px-1 focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none -mx-1"
									spellCheck={false}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</ToolWindow>
	);
}
