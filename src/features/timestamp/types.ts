export type TimestampUnit =
	| "auto"
	| "seconds"
	| "milliseconds"
	| "microseconds"
	| "nanoseconds"
	| "date";

export type TimestampResult = {
	date: Date;
	unit: ConcreteTimestampUnit;
	normalizedInput: string;
	ambiguous: boolean;
};

export type ParseTimestampResult =
	| { ok: true; value: TimestampResult }
	| { ok: false; error: "empty" | "invalid" | "out_of_range" };

export type ConcreteTimestampUnit = Exclude<TimestampUnit, "auto">;
export type ShiftUnit =
	| "second"
	| "minute"
	| "hour"
	| "day"
	| "week"
	| "month"
	| "year";
