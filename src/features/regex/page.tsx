import { useMemo, useState } from "react";
import { getLocale } from "#/paraglide/runtime.js";
import { RegexEditor } from "./components/regex-editor";
import { RegexInspector } from "./components/regex-inspector";
import { TestCases } from "./components/test-cases";
import type { RegexFlag, RegexTestCase } from "./types";
import { evaluateRegex, explainRegex } from "./utils/regex";

const INITIAL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
const INITIAL_CASES: RegexTestCase[] = [
	{ id: 1, text: "user@example.com" },
	{ id: 2, text: "invalid.email@com" },
	{ id: 3, text: "hello.world+test@gmail.com" },
	{ id: 4, text: "admin@localhost" },
];

export function RegexPage() {
	const locale = getLocale();
	const [pattern, setPattern] = useState(INITIAL_PATTERN);
	const [flags, setFlags] = useState<RegexFlag[]>(["g", "i"]);
	const [testCases, setTestCases] = useState(INITIAL_CASES);
	const [selectedId, setSelectedId] = useState(INITIAL_CASES[0].id);
	const [nextId, setNextId] = useState(INITIAL_CASES.length + 1);

	const results = useMemo(
		() =>
			new Map(
				testCases.map((test) => [
					test.id,
					evaluateRegex(pattern, flags, test.text),
				]),
			),
		[pattern, flags, testCases],
	);
	const selectedTest =
		testCases.find((test) => test.id === selectedId) ?? testCases[0];
	const selectedResult = selectedTest
		? results.get(selectedTest.id)
		: undefined;
	const explanation = useMemo(
		() => explainRegex(pattern, locale),
		[pattern, locale],
	);

	function addTestCase() {
		const id = nextId;
		setNextId((value) => value + 1);
		setTestCases((cases) => [...cases, { id, text: "" }]);
		setSelectedId(id);
	}

	function removeTestCase(id: number) {
		setTestCases((cases) => {
			const next = cases.filter((test) => test.id !== id);
			if (selectedId === id) setSelectedId(next[0]?.id ?? 0);
			return next;
		});
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 min-h-0 h-[calc(100vh-var(--header-height))]">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 shrink-0">
				<RegexEditor
					pattern={pattern}
					flags={flags}
					onPatternChange={setPattern}
					onFlagsChange={setFlags}
					onPresetSelect={(preset) => {
						setPattern(preset.pattern);
						const newCases = preset.testCases.map((text, index) => ({
							id: nextId + index,
							text,
						}));
						setNextId(nextId + newCases.length);
						setTestCases(newCases);
						setSelectedId(newCases[0]?.id ?? 0);
					}}
				/>
			</div>

			<div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4">
				<TestCases
					testCases={testCases}
					results={results}
					selectedId={selectedId}
					onSelect={setSelectedId}
					onChange={(id, text) =>
						setTestCases((cases) =>
							cases.map((test) => (test.id === id ? { ...test, text } : test)),
						)
					}
					onAdd={addTestCase}
					onRemove={removeTestCase}
				/>
				<RegexInspector
					testCase={selectedTest}
					result={selectedResult}
					explanation={explanation}
				/>
			</div>
		</div>
	);
}
