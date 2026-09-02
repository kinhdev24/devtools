import {
	KeyRoundIcon,
	ShieldAlertIcon,
	ShieldCheckIcon,
	ShieldIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";
import { verifyHmac } from "../utils/jwt";
import type { VerifyStatus } from "../types";

const HMAC_ALGS = new Set(["HS256", "HS384", "HS512"]);

type JwtSignatureProps = {
	token: string;
	alg: string;
};

export function JwtSignature({ token, alg }: JwtSignatureProps) {
	const [secret, setSecret] = useState("");
	const [status, setStatus] = useState<VerifyStatus>("idle");
	const isHmac = HMAC_ALGS.has(alg);

	const handleVerify = useCallback(async () => {
		if (!secret || !token) return;
		setStatus("checking");
		const result = await verifyHmac(token, secret, alg);
		setStatus(result);
	}, [token, secret, alg]);

	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm">
			{/* Terminal style header */}
			<div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-4 py-2.5">
				<div className="flex gap-1.5 opacity-50 grayscale transition-all hover:grayscale-0">
					<div className="size-2.5 rounded-full bg-destructive/60" />
					<div className="size-2.5 rounded-full bg-amber-500/60" />
					<div className="size-2.5 rounded-full bg-emerald-500/60" />
				</div>
				<span className="ml-2 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
					{m.jwt_section_signature()}
				</span>
				<span className="ml-auto font-mono text-[10px] text-muted-foreground">
					{alg || "—"}
				</span>
			</div>

			<div className="px-4 py-4">
				{isHmac ? (
					<div className="flex flex-col gap-3">
						{/* Secret input row */}
						<div className="flex gap-2">
							<div className="relative min-w-0 flex-1">
								<KeyRoundIcon className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
								<input
									id="jwt-secret-input"
									type="password"
									value={secret}
									onChange={(e) => {
										setSecret(e.target.value);
										setStatus("idle");
									}}
									onKeyDown={(e) => e.key === "Enter" && handleVerify()}
									placeholder={m.jwt_verify_placeholder()}
									autoComplete="off"
									className="h-9 w-full rounded-md border border-border/40 bg-background pl-8 pr-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus:ring-1 focus:ring-ring"
								/>
							</div>
							<Button
								id="jwt-verify-btn"
								size="sm"
								variant="outline"
								onClick={handleVerify}
								disabled={!secret || status === "checking"}
								className="shrink-0"
							>
								{status === "checking"
									? m.jwt_verify_checking()
									: m.jwt_verify_button()}
							</Button>
						</div>

						{/* Result */}
						{status !== "idle" && status !== "checking" && (
							<VerifyResult status={status} alg={alg} />
						)}
					</div>
				) : (
					<div className="flex items-start gap-2.5 rounded-md bg-muted/40 px-3 py-2.5">
						<ShieldIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
						<p className="text-xs text-muted-foreground">
							{m.jwt_verify_unsupported()}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

function VerifyResult({
	status,
	alg,
}: {
	status: Exclude<VerifyStatus, "idle" | "checking">;
	alg: string;
}) {
	if (status === "valid") {
		return (
			<div className="flex items-center gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
				<ShieldCheckIcon
					className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
					aria-hidden="true"
				/>
				<span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
					{m.jwt_verify_valid()}
				</span>
				<code className="ml-auto font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
					{alg}
				</code>
			</div>
		);
	}

	if (status === "invalid") {
		return (
			<div className="flex items-center gap-2.5 rounded-md border border-destructive/25 bg-destructive/8 px-3 py-2.5">
				<ShieldAlertIcon
					className="size-4 shrink-0 text-destructive"
					aria-hidden="true"
				/>
				<span className="text-sm font-medium text-destructive">
					{m.jwt_verify_invalid()}
				</span>
			</div>
		);
	}

	return null;
}
