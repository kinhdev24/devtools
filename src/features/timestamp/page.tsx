import { useNavigate } from "@tanstack/react-router";
import { MinusIcon, PlusIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
	ToolWindow,
	ToolWindowHeader,
	ToolWindowToolbar,
} from "#/components/layout/tool-window";
import { Button } from "#/components/ui/button";
import { TooltipProvider } from "#/components/ui/tooltip";
import * as m from "#/paraglide/messages.js";
import { getLocale } from "#/paraglide/runtime.js";
import { Route } from "#/routes/timestamp";
import { EmptyTimestamp } from "./components/empty-timestamp";
import { Fact } from "./components/fact";
import { InputStatus } from "./components/input-status";
import { OutputRow } from "./components/output-row";
import { TIME_ZONES } from "./constants";
import type { ShiftUnit, TimestampUnit } from "./types";
import {
	formatInTimeZone,
	formatRelativeTime,
	getDateFacts,
	getDeveloperSnippets,
	getUnixValues,
	parseTimestamp,
	shiftTimestamp,
	toDateTimeLocalValue,
} from "./utils/timestamp";

export function TimestampPage() {
	const { value: initialValue } = Route.useSearch();
	const navigate = useNavigate();
	const locale = getLocale();
	const [input, setInput] = useState(initialValue ?? "");
	const [interpretation, setInterpretation] = useState<TimestampUnit>("auto");
	const [now, setNow] = useState(0);
	const [timeZone, setTimeZone] = useState("UTC");
	const [localTimeZone, setLocalTimeZone] = useState("UTC");
	const [shiftAmount, setShiftAmount] = useState("1");
	const [shiftUnit, setShiftUnit] = useState<ShiftUnit>("day");

	useEffect(() => {
		if (initialValue) navigate({ to: "/timestamp", search: {}, replace: true });
	}, [initialValue, navigate]);

	useEffect(() => {
		setNow(Date.now());
		setLocalTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
		const id = window.setInterval(() => setNow(Date.now()), 1_000);
		return () => window.clearInterval(id);
	}, []);

	const result = useMemo(
		() => parseTimestamp(input, interpretation),
		[input, interpretation],
	);
	const date = result.ok ? result.value.date : null;
	const unixValues = useMemo(() => (date ? getUnixValues(date) : null), [date]);
	const dateFacts = useMemo(
		() => (date ? getDateFacts(date, timeZone, locale) : null),
		[date, timeZone, locale],
	);

	function useCurrentTime() {
		const current = Date.now();
		setNow(current);
		setInterpretation("seconds");
		setInput(Math.floor(current / 1_000).toString());
	}

	function applyShift(direction: 1 | -1) {
		if (!date) return;
		const amount = Number(shiftAmount);
		if (!Number.isFinite(amount)) return;
		setInterpretation("date");
		setInput(shiftTimestamp(date, amount * direction, shiftUnit).toISOString());
	}

	return (
		<TooltipProvider>
			<div className="relative flex h-full flex-col overflow-y-auto">
				<div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
					{/* Header */}
					<div className="mb-2">
						<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{m.timestamp_title()}
						</h1>
						<p className="mt-2 text-muted-foreground">
							{m.timestamp_description()}
						</p>
					</div>

					{/* Hero Input Area */}
					{/* Hero Input Area */}
					<ToolWindow>
						<ToolWindowHeader title="input://timestamp">
							<ToolWindowToolbar>
								<Button
									size="sm"
									variant="ghost"
									className="h-7 px-2 text-xs"
									onClick={useCurrentTime}
								>
									<RefreshCwIcon className="mr-1.5 size-3" />
									{m.timestamp_use_now()}
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="h-7 px-2 text-xs"
									onClick={() => {
										setInterpretation("date");
										setInput(toDateTimeLocalValue(new Date(now)));
									}}
								>
									{m.timestamp_local_now()}
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
									className="h-7 w-7"
									onClick={() => {
										setInput("");
										setInterpretation("auto");
									}}
									disabled={!input}
								>
									<Trash2Icon className="size-3.5" />
								</Button>
							</ToolWindowToolbar>
						</ToolWindowHeader>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder={m.timestamp_input_placeholder()}
							className="w-full border-0 bg-transparent px-4 py-6 font-mono text-xl outline-none focus:ring-0 sm:text-2xl"
							spellCheck={false}
						/>
						<div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 bg-muted/20 px-4 py-2.5">
							<InputStatus input={input} result={result} />

							<div className="flex items-center gap-2">
								<select
									value={interpretation}
									onChange={(event) =>
										setInterpretation(event.target.value as TimestampUnit)
									}
									className="h-7 rounded-md border-0 bg-muted/50 px-2 font-mono text-[11px] outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
								>
									<option value="auto">{m.timestamp_unit_auto()}</option>
									<option value="seconds">{m.timestamp_unit_seconds()}</option>
									<option value="milliseconds">
										{m.timestamp_unit_milliseconds()}
									</option>
									<option value="microseconds">
										{m.timestamp_unit_microseconds()}
									</option>
									<option value="nanoseconds">
										{m.timestamp_unit_nanoseconds()}
									</option>
									<option value="date">{m.timestamp_unit_date()}</option>
								</select>
							</div>
						</div>
					</ToolWindow>

					{/* Output Area */}
					{date && unixValues && dateFacts ? (
						<div className="flex flex-col gap-6">
							{/* Primary Display */}
							<div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/60 p-8 text-center shadow-lg backdrop-blur-xl">
								<h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
									{formatInTimeZone(date, localTimeZone, locale)}
								</h2>
								<p className="mt-3 text-lg font-medium text-muted-foreground">
									{now ? formatRelativeTime(date, now, locale) : "—"}
								</p>
							</div>

							{/* Unified Inspector Panel */}
							<ToolWindow>
								<ToolWindowHeader title="inspector://timestamp" />
								<div className="grid divide-y divide-border/40 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
									{/* Left Column: Formats & Snippets */}
									<div className="flex flex-col">
										<div className="border-b border-border/40 bg-muted/10 px-4 py-3">
											<h3 className="text-sm font-semibold tracking-tight">
												{m.timestamp_formats_title()}
											</h3>
										</div>
										<div className="flex flex-col gap-4 p-4">
											<div className="grid gap-2">
												<OutputRow
													label="ISO 8601"
													value={date.toISOString()}
												/>
												<OutputRow label="UTC" value={date.toUTCString()} />
												<OutputRow
													label="Unix (s)"
													value={unixValues.seconds}
												/>
												<OutputRow
													label="Unix (ms)"
													value={unixValues.milliseconds}
												/>
											</div>
											<div className="h-px bg-border/40" />
											<h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
												{m.timestamp_snippets_title()}
											</h4>
											<div className="grid gap-2">
												{getDeveloperSnippets(date).map((snippet) => (
													<OutputRow
														key={snippet.label}
														label={snippet.label}
														value={snippet.value}
													/>
												))}
											</div>
										</div>
									</div>

									{/* Right Column: Lens & Shifter */}
									<div className="flex flex-col divide-y divide-border/40">
										<div className="flex flex-col">
											<div className="bg-muted/10 px-4 py-3">
												<h3 className="text-sm font-semibold tracking-tight">
													{m.timestamp_timezone_title()}
												</h3>
											</div>
											<div className="flex flex-col gap-4 p-4">
												<select
													value={timeZone}
													onChange={(event) => setTimeZone(event.target.value)}
													className="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
												>
													{TIME_ZONES.map((zone) => (
														<option key={zone}>{zone}</option>
													))}
												</select>
												<div className="rounded-lg border border-border/40 bg-muted/20 p-3 text-center">
													<p className="font-mono text-base font-semibold">
														{formatInTimeZone(date, timeZone, locale)}
													</p>
												</div>
												<div className="grid grid-cols-2 gap-2 text-xs">
													<Fact
														label={m.timestamp_weekday()}
														value={dateFacts.weekday}
													/>
													<Fact
														label={m.timestamp_iso_week()}
														value={dateFacts.week}
													/>
												</div>
											</div>
										</div>

										<div className="flex flex-col">
											<div className="bg-muted/10 px-4 py-3">
												<h3 className="text-sm font-semibold tracking-tight">
													{m.timestamp_shift_title()}
												</h3>
											</div>
											<div className="flex flex-col gap-3 p-4">
												<div className="grid grid-cols-[1fr_1fr] gap-2">
													<input
														type="number"
														value={shiftAmount}
														onChange={(event) =>
															setShiftAmount(event.target.value)
														}
														className="h-9 min-w-0 rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
													/>
													<select
														value={shiftUnit}
														onChange={(event) =>
															setShiftUnit(event.target.value as ShiftUnit)
														}
														className="h-9 min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
													>
														<option value="second">
															{m.timestamp_seconds()}
														</option>
														<option value="minute">
															{m.timestamp_minutes()}
														</option>
														<option value="hour">{m.timestamp_hours()}</option>
														<option value="day">{m.timestamp_days()}</option>
														<option value="month">
															{m.timestamp_months()}
														</option>
														<option value="year">{m.timestamp_years()}</option>
													</select>
												</div>
												<div className="grid grid-cols-2 gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() => applyShift(-1)}
													>
														<MinusIcon className="mr-1.5 size-3.5" />
														{m.timestamp_subtract()}
													</Button>
													<Button size="sm" onClick={() => applyShift(1)}>
														<PlusIcon className="mr-1.5 size-3.5" />
														{m.timestamp_add()}
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</ToolWindow>
						</div>
					) : (
						<EmptyTimestamp
							onExample={(val) => {
								setInterpretation("auto");
								setInput(val);
							}}
						/>
					)}
				</div>
			</div>
		</TooltipProvider>
	);
}
