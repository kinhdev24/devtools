import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import {
	ToolWindow,
	ToolWindowHeader,
	ToolWindowToolbar,
} from "#/components/layout/tool-window";
import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";
import { formatRelative, formatTimestamp } from "../utils/jwt";

/** Standard claim annotations — maps claim key → label getter */
const CLAIM_LABELS: Record<string, () => string> = {
	sub: m.jwt_claim_sub,
	iss: m.jwt_claim_iss,
	aud: m.jwt_claim_aud,
	exp: m.jwt_claim_exp,
	iat: m.jwt_claim_iat,
	nbf: m.jwt_claim_nbf,
	jti: m.jwt_claim_jti,
};

/** Claims whose values are Unix timestamps */
const TIMESTAMP_CLAIMS = new Set(["exp", "iat", "nbf"]);

type JwtDecodedProps = {
	header: Record<string, unknown>;
	payload: Record<string, unknown>;
	now: number;
	locale: string;
};

export function JwtDecoded({ header, payload, now, locale }: JwtDecodedProps) {
	return (
		<div className="grid gap-3 sm:grid-cols-[1fr_1.6fr]">
			<ClaimsSection
				title={m.jwt_section_header()}
				claims={header}
				now={now}
				locale={locale}
				showAnnotations={false}
			/>
			<ClaimsSection
				title={m.jwt_section_payload()}
				claims={payload}
				now={now}
				locale={locale}
				showAnnotations
			/>
		</div>
	);
}

// ---------------------------------------------------------------------------
// ClaimsSection
// ---------------------------------------------------------------------------

function ClaimsSection({
	title,
	claims,
	now,
	locale,
	showAnnotations,
}: {
	title: string;
	claims: Record<string, unknown>;
	now: number;
	locale: string;
	showAnnotations: boolean;
}) {
	const entries = Object.entries(claims);

	return (
		<ToolWindow className="h-full">
			<ToolWindowHeader title={title}>
				<ToolWindowToolbar>
					<span className="font-mono text-[10px] font-medium text-muted-foreground/70">
						{entries.length} items
					</span>
				</ToolWindowToolbar>
			</ToolWindowHeader>

			{/* Claims */}
			<div className="flex flex-col gap-1 p-2">
				{entries.length === 0 ? (
					<div className="flex py-6 justify-center items-center text-xs text-muted-foreground italic">
						Empty
					</div>
				) : (
					entries.map(([key, value]) => (
						<ClaimRow
							key={key}
							claimKey={key}
							value={value}
							now={now}
							locale={locale}
							showAnnotation={showAnnotations}
						/>
					))
				)}
			</div>
		</ToolWindow>
	);
}

// ---------------------------------------------------------------------------
// ClaimRow
// ---------------------------------------------------------------------------

function ClaimRow({
	claimKey,
	value,
	now,
	locale,
	showAnnotation,
}: {
	claimKey: string;
	value: unknown;
	now: number;
	locale: string;
	showAnnotation: boolean;
}) {
	const [copied, setCopied] = useState(false);
	const annotation = showAnnotation ? CLAIM_LABELS[claimKey]?.() : undefined;
	const isTimestamp =
		TIMESTAMP_CLAIMS.has(claimKey) && typeof value === "number";

	const displayValue = isTimestamp
		? formatTimestamp(value as number, locale)
		: formatClaimValue(value);

	const copyValue = isTimestamp
		? String(value)
		: typeof value === "string"
			? value
			: JSON.stringify(value);

	async function handleCopy() {
		await navigator.clipboard.writeText(copyValue);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<div className="group relative flex items-start justify-between gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted/50">
			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<div className="flex items-center gap-2">
					{/* Key */}
					<span
						className="min-w-[2.5rem] shrink-0 font-mono text-[11.5px] font-medium"
						style={{ color: "var(--json-key)" }}
					>
						{claimKey}
					</span>

					{/* Meta / Annotation */}
					{isTimestamp && (
						<span className="flex items-center gap-1 rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground uppercase tracking-wide">
							{now ? formatRelative(value as number, now, locale) : "—"}
						</span>
					)}
					{annotation && !isTimestamp && (
						<span className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground uppercase tracking-wide">
							{annotation}
						</span>
					)}
				</div>

				{/* Value */}
				<span className="break-all font-mono text-[12.5px] leading-relaxed text-foreground/90 selection:bg-blue-500/30">
					{displayValue}
				</span>
			</div>

			{/* Copy button */}
			<Button
				size="icon-xs"
				variant="ghost"
				onClick={handleCopy}
				title={m.jwt_copy_value()}
				className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-foreground"
			>
				{copied ? (
					<CheckIcon className="size-3.5 text-emerald-500" aria-hidden="true" />
				) : (
					<ClipboardIcon className="size-3.5" aria-hidden="true" />
				)}
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatClaimValue(value: unknown): string {
	if (value === null) return "null";
	if (typeof value === "string") return `"${value}"`;
	if (typeof value === "boolean" || typeof value === "number")
		return String(value);
	if (Array.isArray(value)) return JSON.stringify(value);
	return JSON.stringify(value, null, 2);
}
