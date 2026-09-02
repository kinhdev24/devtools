import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ToolWindow } from "#/components/layout/tool-window";
import * as m from "#/paraglide/messages.js";
import { Route } from "#/routes/jwt";
import { JwtDecoded } from "./components/jwt-decoded";
import { JwtInput } from "./components/jwt-input";
import { JwtSignature } from "./components/jwt-signature";
import { JwtTimeline } from "./components/jwt-timeline";
import type { JwtStatus } from "./types";
import { decodeJwt, getTokenStatus } from "./utils/jwt";

export function JwtPage() {
	const { token: initialToken } = Route.useSearch();
	const navigate = useNavigate();
	const [token, setToken] = useState(initialToken ?? "");
	const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

	// Consume ?token= param and clean URL
	useEffect(() => {
		if (initialToken) {
			navigate({ to: "/jwt", search: {}, replace: true });
		}
	}, [initialToken, navigate]);

	// Live clock — only ticks when we have a token with time-based claims
	const decodeResult = useMemo(
		() => (token.trim() ? decodeJwt(token) : null),
		[token],
	);

	const hasTimeClaims = useMemo(() => {
		if (!decodeResult?.ok) return false;
		const { payload } = decodeResult.parts;
		return typeof payload.exp === "number" || typeof payload.nbf === "number";
	}, [decodeResult]);

	useEffect(() => {
		if (!hasTimeClaims) return;
		const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
		return () => clearInterval(id);
	}, [hasTimeClaims]);

	// Derive status
	const status: JwtStatus = useMemo(() => {
		if (!token.trim()) return "idle";
		if (!decodeResult) return "idle";
		if (!decodeResult.ok) return "invalid";
		return getTokenStatus(decodeResult.parts.payload, now);
	}, [token, decodeResult, now]);

	const errorMessage = useMemo(() => {
		if (!decodeResult || decodeResult.ok) return undefined;
		const map = {
			invalid_format: m.jwt_error_invalid_format,
			invalid_header: m.jwt_error_invalid_header,
			invalid_payload: m.jwt_error_invalid_payload,
		} as const;
		return map[decodeResult.error]?.();
	}, [decodeResult]);

	function handleClear() {
		setToken("");
	}

	return (
		<div className="relative flex h-full flex-col overflow-y-auto">
			<div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
				{/* Status + error inline (floating style) */}
				<div className="flex flex-wrap items-center gap-3 rounded-full border border-border/40 bg-background/80 px-4 py-2.5 shadow-sm backdrop-blur-md self-start">
					<StatusBadge status={status} />
					{status === "invalid" && errorMessage && (
						<>
							<div className="h-4 w-px bg-border" />
							<span className="truncate text-[11px] font-medium text-destructive">
								{errorMessage}
							</span>
						</>
					)}
				</div>

				{/* Input Card */}
				<ToolWindow>
					<JwtInput value={token} onChange={setToken} onClear={handleClear} />
				</ToolWindow>

				{/* Decoded sections */}
				{decodeResult?.ok && (
					<div className="flex flex-col gap-6">
						<JwtDecoded
							header={decodeResult.parts.header}
							payload={decodeResult.parts.payload}
							now={now}
						/>

						{(typeof decodeResult.parts.payload.iat === "number" ||
							typeof decodeResult.parts.payload.exp === "number") && (
							<JwtTimeline
								iat={
									typeof decodeResult.parts.payload.iat === "number"
										? decodeResult.parts.payload.iat
										: undefined
								}
								nbf={
									typeof decodeResult.parts.payload.nbf === "number"
										? decodeResult.parts.payload.nbf
										: undefined
								}
								exp={
									typeof decodeResult.parts.payload.exp === "number"
										? decodeResult.parts.payload.exp
										: undefined
								}
								now={now}
							/>
						)}

						<JwtSignature
							token={token.trim()}
							alg={
								typeof decodeResult.parts.header.alg === "string"
									? decodeResult.parts.header.alg
									: ""
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: JwtStatus }) {
	const config: Record<
		JwtStatus,
		{ label: () => string; dot: string; color: string; pulsing?: boolean }
	> = {
		idle: {
			label: m.jwt_status_idle,
			dot: "bg-muted-foreground/40",
			color: "text-muted-foreground",
		},
		valid: {
			label: m.jwt_status_valid,
			dot: "bg-emerald-500",
			color: "text-emerald-600 dark:text-emerald-400",
			pulsing: true,
		},
		expired: {
			label: m.jwt_status_expired,
			dot: "bg-destructive",
			color: "text-destructive",
		},
		not_yet_valid: {
			label: m.jwt_status_not_yet_valid,
			dot: "bg-amber-500",
			color: "text-amber-600 dark:text-amber-400",
		},
		invalid: {
			label: m.jwt_status_invalid,
			dot: "bg-destructive",
			color: "text-destructive",
		},
	};

	const { label, dot, color, pulsing } = config[status];

	return (
		<div
			className={`flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase ${color}`}
		>
			{pulsing ? (
				<div className="relative flex size-1.5 items-center justify-center">
					<span
						className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dot.replace("500", "400")}`}
					/>
					<span
						className={`relative inline-flex size-1.5 rounded-full ${dot}`}
					/>
				</div>
			) : (
				<span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
			)}
			{label()}
		</div>
	);
}
