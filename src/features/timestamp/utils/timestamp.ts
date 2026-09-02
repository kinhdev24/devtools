import dayjs, { type Dayjs, type ManipulateType } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayOfYear from "dayjs/plugin/dayOfYear";
import duration from "dayjs/plugin/duration";
import isoWeek from "dayjs/plugin/isoWeek";
import localizedFormat from "dayjs/plugin/localizedFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/vi";
import type {
	ConcreteTimestampUnit,
	ParseTimestampResult,
	ShiftUnit,
	TimestampUnit,
} from "../types";

dayjs.extend(advancedFormat);
dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(dayOfYear);
dayjs.extend(duration);
dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

const NUMERIC_PATTERN = /^[+-]?\d+(?:\.\d+)?$/;
const DATE_FORMATS = [
	"YYYY-MM-DD HH:mm:ss.SSS",
	"YYYY-MM-DD HH:mm:ss",
	"YYYY-MM-DD HH:mm",
	"YYYY-MM-DD",
	"DD/MM/YYYY HH:mm:ss",
	"DD/MM/YYYY HH:mm",
	"DD/MM/YYYY",
	"MM/DD/YYYY HH:mm:ss",
	"MM/DD/YYYY HH:mm",
	"MM/DD/YYYY",
];

export function parseTimestamp(
	input: string,
	interpretation: TimestampUnit = "auto",
): ParseTimestampResult {
	const normalizedInput = input.trim();
	if (!normalizedInput) return { ok: false, error: "empty" };

	if (interpretation !== "date" && NUMERIC_PATTERN.test(normalizedInput)) {
		const numeric = Number(normalizedInput);
		if (!Number.isFinite(numeric)) return { ok: false, error: "out_of_range" };
		const digits = normalizedInput.replace(/^[+-]/, "").split(".")[0].length;
		const unit =
			interpretation === "auto"
				? detectNumericUnit(digits, normalizedInput)
				: interpretation;
		const milliseconds = toMilliseconds(numeric, unit);
		const parsed = dayjs(milliseconds);
		if (!parsed.isValid()) return { ok: false, error: "out_of_range" };

		return {
			ok: true,
			value: {
				date: parsed.toDate(),
				unit,
				normalizedInput,
				ambiguous:
					interpretation === "auto" &&
					(digits === 11 || digits === 12 || digits === 14 || digits === 15),
			},
		};
	}

	if (interpretation !== "auto" && interpretation !== "date") {
		return { ok: false, error: "invalid" };
	}

	const parsed = parseDateText(normalizedInput);
	if (!parsed.isValid()) return { ok: false, error: "invalid" };
	return {
		ok: true,
		value: {
			date: parsed.toDate(),
			unit: "date",
			normalizedInput,
			ambiguous: !hasExplicitTimezone(normalizedInput),
		},
	};
}

function detectNumericUnit(
	digits: number,
	input: string,
): ConcreteTimestampUnit {
	if (input.includes(".") || digits <= 10) return "seconds";
	if (digits <= 13) return "milliseconds";
	if (digits <= 16) return "microseconds";
	return "nanoseconds";
}

function toMilliseconds(value: number, unit: ConcreteTimestampUnit) {
	if (unit === "seconds") return value * 1_000;
	if (unit === "milliseconds") return value;
	if (unit === "microseconds") return value / 1_000;
	if (unit === "nanoseconds") return value / 1_000_000;
	return value;
}

function parseDateText(input: string) {
	const strict = dayjs(input, DATE_FORMATS, true);
	return strict.isValid() ? strict : dayjs(input);
}

function hasExplicitTimezone(input: string) {
	return /(?:z|[+-]\d{2}:?\d{2}|\b(?:utc|gmt)\b)$/i.test(input.trim());
}

export function getUnixValues(date: Date) {
	const milliseconds = date.getTime();
	return {
		seconds: Math.floor(milliseconds / 1_000).toString(),
		milliseconds: milliseconds.toString(),
		microseconds: (BigInt(milliseconds) * 1_000n).toString(),
		nanoseconds: (BigInt(milliseconds) * 1_000_000n).toString(),
	};
}

export function formatInTimeZone(date: Date, timeZone: string, locale: string) {
	return localize(dayjs(date).tz(timeZone), locale).format(
		"ddd, D MMM YYYY, HH:mm:ss Z",
	);
}

export function formatRelativeTime(date: Date, now: number, locale: string) {
	return localize(dayjs(date), locale).from(dayjs(now));
}

export function formatCalendarTime(date: Date, now: number, locale: string) {
	return localize(dayjs(date), locale).calendar(dayjs(now));
}

export function getDateFacts(date: Date, timeZone: string, locale: string) {
	const value = localize(dayjs(date).tz(timeZone), locale);
	return {
		weekday: value.format("dddd"),
		week: value.isoWeek().toString(),
		dayOfYear: value.dayOfYear().toString(),
		quarter: value.quarter().toString(),
		offset: value.format("Z"),
	};
}

export function shiftTimestamp(date: Date, amount: number, unit: ShiftUnit) {
	return dayjs(date)
		.add(amount, unit as ManipulateType)
		.toDate();
}

export function formatExactDistance(date: Date, now: number) {
	const milliseconds = Math.abs(date.getTime() - now);
	const value = dayjs.duration(milliseconds);
	const days = Math.floor(value.asDays());
	const parts = [
		days ? `${days}d` : "",
		value.hours() ? `${value.hours()}h` : "",
		value.minutes() ? `${value.minutes()}m` : "",
		`${value.seconds()}s`,
	].filter(Boolean);
	return parts.join(" ");
}

export function toDateTimeLocalValue(date: Date) {
	return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
}

export function getDeveloperSnippets(date: Date) {
	const iso = date.toISOString();
	const milliseconds = date.getTime();
	return [
		{ label: "JavaScript", value: `new Date(${milliseconds})` },
		{
			label: "Python",
			value: `datetime.fromtimestamp(${milliseconds / 1_000}, tz=timezone.utc)`,
		},
		{
			label: "SQL",
			value: `TIMESTAMP '${iso.replace("T", " ").replace("Z", "+00:00")}'`,
		},
		{ label: "cURL / JSON", value: `"${iso}"` },
	];
}

function localize(value: Dayjs, locale: string) {
	return value.locale(locale === "vi" ? "vi" : "en");
}
