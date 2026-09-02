import * as m from "#/paraglide/messages.js";
import { formatRelative, formatTimestamp } from "../utils/jwt";

type JwtTimelineProps = {
	iat?: number;
	nbf?: number;
	exp?: number;
	now: number;
};

export function JwtTimeline({ iat, nbf, exp, now }: JwtTimelineProps) {
	if (!iat && !exp) return null;

	const start = iat ?? now - 300;
	const end = exp ?? now + 300;
	const total = end - start;

	const clamp = (v: number) => Math.min(Math.max((v - start) / total, 0), 1);

	const nowPct = clamp(now) * 100;
	const nbfPct = nbf ? clamp(nbf) * 100 : undefined;

	const isExpired = exp !== undefined && now > exp;
	const isNotYetValid = nbf !== undefined && now < nbf;

	const fillColor = isExpired
		? "bg-destructive"
		: isNotYetValid
			? "bg-amber-500"
			: "bg-emerald-500";

	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm">
			{/* Terminal style header */}
			<div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-4 py-2.5">
				<div className="flex gap-1.5 opacity-80">
					<div className={`size-2.5 rounded-full bg-destructive/60 ${isExpired ? 'opacity-100 ring-2 ring-destructive/30' : 'opacity-40 grayscale'}`} />
					<div className={`size-2.5 rounded-full bg-amber-500/60 ${isNotYetValid ? 'opacity-100 ring-2 ring-amber-500/30' : 'opacity-40 grayscale'}`} />
					<div className={`size-2.5 rounded-full bg-emerald-500/60 ${!isExpired && !isNotYetValid ? 'opacity-100 ring-2 ring-emerald-500/30' : 'opacity-40 grayscale'}`} />
				</div>
				<span className="ml-2 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
					{m.jwt_section_timeline()}
				</span>
			</div>

			<div className="flex flex-col gap-4 px-4 py-4">
				{/* Track */}
				<div className="relative pb-7 pt-7 px-6">
					{/* Track background */}
					<div className="relative h-1.5 rounded-full bg-border">
						{/* Fill: start → now */}
						<div
							className={`absolute inset-y-0 left-0 rounded-full ${fillColor} transition-all duration-1000`}
							style={{ width: `${Math.min(nowPct, 100)}%` }}
						/>

						{/* nbf marker */}
						{nbfPct !== undefined && (
							<TrackMarker
								pct={nbfPct}
								label={m.jwt_timeline_not_before()}
								color="amber"
								position="top"
							/>
						)}

						{/* now marker */}
						<TrackMarker
							pct={Math.min(nowPct, 100)}
							label={m.jwt_timeline_now()}
							color={isExpired ? "destructive" : "primary"}
							position="bottom"
						/>
					</div>
				</div>

				{/* Anchor labels */}
				<div className="grid grid-cols-2 gap-4 text-[11px]">
					{iat && (
						<AnchorLabel
							label={m.jwt_timeline_issued()}
							ts={iat}
							now={now}
							align="left"
							color="muted"
						/>
					)}
					{exp && (
						<AnchorLabel
							label={m.jwt_timeline_expires()}
							ts={exp}
							now={now}
							align="right"
							color={isExpired ? "destructive" : "muted"}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TrackMarker({
	pct,
	label,
	color,
	position = "top",
}: {
	pct: number;
	label: string;
	color: "amber" | "primary" | "destructive";
	position?: "top" | "bottom";
}) {
	const dotColor =
		color === "amber"
			? "bg-amber-500 ring-amber-500/30"
			: color === "destructive"
				? "bg-destructive ring-destructive/30"
				: "bg-foreground ring-foreground/20";

	const labelColor =
		color === "amber"
			? "text-amber-600 dark:text-amber-400"
			: color === "destructive"
				? "text-destructive"
				: "text-foreground";

	const positionClass = position === "top" ? "-top-6" : "top-4";

	return (
		<div
			className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
			style={{ left: `${pct}%` }}
		>
			<div
				className={`size-3 rounded-full border-2 border-background ring-2 ${dotColor}`}
			/>
			<span
				className={`absolute ${positionClass} left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-semibold ${labelColor}`}
			>
				{label}
			</span>
		</div>
	);
}

function AnchorLabel({
	label,
	ts,
	now,
	align,
	color,
}: {
	label: string;
	ts: number;
	now: number;
	align: "left" | "right";
	color: "muted" | "destructive";
}) {
	const textAlign = align === "right" ? "text-right" : "text-left";
	const labelClass =
		color === "destructive" ? "text-destructive" : "text-muted-foreground";

	return (
		<div className={`flex flex-col gap-0.5 ${textAlign}`}>
			<span className={`font-semibold uppercase tracking-wider text-[9px] ${labelClass}`}>
				{label}
			</span>
			<span className="font-mono text-[11px] text-foreground">
				{formatTimestamp(ts)}
			</span>
			<span className={`text-[10px] ${labelClass}`}>
				{formatRelative(ts, now)}
			</span>
		</div>
	);
}
