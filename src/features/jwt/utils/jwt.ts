import type { JwtDecodeResult, JwtStatus, VerifyStatus } from "../types";

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

/**
 * Decode a JWT string into its three parts.
 * Does NOT verify the signature — use verifyHmac() for that.
 */
export function decodeJwt(token: string): JwtDecodeResult {
	const trimmed = token.trim();
	const parts = trimmed.split(".");

	if (parts.length !== 3) {
		return { ok: false, error: "invalid_format" };
	}

	const [headerB64, payloadB64, signatureB64] = parts as [
		string,
		string,
		string,
	];

	let header: Record<string, unknown>;
	try {
		header = JSON.parse(base64urlDecodeText(headerB64));
	} catch {
		return { ok: false, error: "invalid_header" };
	}

	let payload: Record<string, unknown>;
	try {
		payload = JSON.parse(base64urlDecodeText(payloadB64));
	} catch {
		return { ok: false, error: "invalid_payload" };
	}

	return {
		ok: true,
		parts: {
			header,
			payload,
			raw: { header: headerB64, payload: payloadB64, signature: signatureB64 },
		},
	};
}

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

/** Derive whether the token is active, expired, or not yet valid based on claims. */
export function getTokenStatus(
	payload: Record<string, unknown>,
	now: number,
): Exclude<JwtStatus, "idle" | "invalid"> {
	const exp = typeof payload.exp === "number" ? payload.exp : undefined;
	const nbf = typeof payload.nbf === "number" ? payload.nbf : undefined;

	if (nbf !== undefined && now < nbf) return "not_yet_valid";
	if (exp !== undefined && now > exp) return "expired";
	return "valid";
}

// ---------------------------------------------------------------------------
// Signature verification (HMAC only, via Web Crypto API)
// ---------------------------------------------------------------------------

const HMAC_HASH: Record<string, string> = {
	HS256: "SHA-256",
	HS384: "SHA-384",
	HS512: "SHA-512",
};

/**
 * Verify a JWT HMAC signature using the browser SubtleCrypto API.
 * Returns "unsupported" for non-HMAC algorithms.
 * Never sends the secret or token over the network.
 */
export async function verifyHmac(
	token: string,
	secret: string,
	alg: string,
): Promise<Exclude<VerifyStatus, "idle" | "checking">> {
	const hashAlg = HMAC_HASH[alg];
	if (!hashAlg) return "unsupported";

	const parts = token.trim().split(".");
	if (parts.length !== 3) return "invalid";

	const [headerB64, payloadB64, signatureB64] = parts as [
		string,
		string,
		string,
	];

	try {
		const keyMaterial = new TextEncoder().encode(secret);
		const key = await crypto.subtle.importKey(
			"raw",
			keyMaterial,
			{ name: "HMAC", hash: { name: hashAlg } },
			false,
			["verify"],
		);

		const signingInput = `${headerB64}.${payloadB64}`;
		const dataBytes = new TextEncoder().encode(signingInput);
		const signatureBytes = base64urlToBytes(signatureB64);

		const isValid = await crypto.subtle.verify(
			"HMAC",
			key,
			signatureBytes.buffer as ArrayBuffer,
			dataBytes.buffer as ArrayBuffer,
		);
		return isValid ? "valid" : "invalid";
	} catch {
		return "invalid";
	}
}

// ---------------------------------------------------------------------------
// Timestamp helpers
// ---------------------------------------------------------------------------

/** Format a Unix timestamp as a readable local datetime string. */
export function formatTimestamp(unix: number, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "UTC",
	}).format(new Date(unix * 1000));
}

/**
 * Format the difference between a Unix timestamp and now as a relative string.
 * e.g. "in 2 hours", "3 days ago"
 */
export function formatRelative(
	unix: number,
	nowSec: number,
	locale: string,
): string {
	const diffSec = unix - nowSec;
	const sign = diffSec >= 0 ? 1 : -1;
	const abs = Math.abs(diffSec);

	const units: Array<[number, Intl.RelativeTimeFormatUnit]> = [
		[86400, "day"],
		[3600, "hour"],
		[60, "minute"],
		[1, "second"],
	];

	for (const [secs, unit] of units) {
		if (abs >= secs || unit === "second") {
			const count = Math.floor(abs / secs) * sign;
			return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
				count,
				unit,
			);
		}
	}
	return "just now";
}

// ---------------------------------------------------------------------------
// Base64url helpers
// ---------------------------------------------------------------------------

function base64urlToBytes(str: string): Uint8Array {
	const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
	const padded = base64.padEnd(
		base64.length + ((4 - (base64.length % 4)) % 4),
		"=",
	);
	const binary = atob(padded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

function base64urlDecodeText(str: string): string {
	const bytes = base64urlToBytes(str);
	return new TextDecoder().decode(bytes);
}
