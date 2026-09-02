import { AlertTriangleIcon } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import * as m from "#/paraglide/messages.js";
import type { TimestampUnit } from "../types";
import type { parseTimestamp } from "../utils/timestamp";

function unitLabel(unit: Exclude<TimestampUnit, "auto">) {
	return {
		seconds: m.timestamp_unit_seconds(),
		milliseconds: m.timestamp_unit_milliseconds(),
		microseconds: m.timestamp_unit_microseconds(),
		nanoseconds: m.timestamp_unit_nanoseconds(),
		date: m.timestamp_unit_date(),
	}[unit];
}

export function InputStatus({
	input,
	result,
}: {
	input: string;
	result: ReturnType<typeof parseTimestamp>;
}) {
	if (!input.trim()) {
		return (
			<span className="text-[11px] font-medium text-muted-foreground/60">
				{m.timestamp_status_idle()}
			</span>
		);
	}
	if (!result.ok) {
		return (
			<p className="flex items-center gap-1.5 text-[11px] font-medium text-destructive">
				<AlertTriangleIcon className="size-3.5" />
				{result.error === "invalid"
					? m.timestamp_error_invalid()
					: m.timestamp_error_range()}
			</p>
		);
	}
	return (
		<div className="flex flex-wrap items-center gap-2 text-[11px]">
			<Badge variant="outline" className="h-5 px-1.5 text-[10px]">
				{m.timestamp_detected({ unit: unitLabel(result.value.unit) })}
			</Badge>
			{result.value.ambiguous && (
				<span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-500">
					<AlertTriangleIcon className="size-3.5" />
					{m.timestamp_ambiguous()}
				</span>
			)}
		</div>
	);
}
