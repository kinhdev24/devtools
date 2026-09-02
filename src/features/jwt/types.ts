export type JwtStatus =
	| "idle"
	| "valid"
	| "expired"
	| "not_yet_valid"
	| "invalid";

export type JwtRaw = {
	header: string;
	payload: string;
	signature: string;
};

export type JwtParts = {
	header: Record<string, unknown>;
	payload: Record<string, unknown>;
	raw: JwtRaw;
};

export type JwtDecodeResult =
	| { ok: true; parts: JwtParts }
	| {
			ok: false;
			error: "invalid_format" | "invalid_header" | "invalid_payload";
	  };

export type VerifyStatus =
	| "idle"
	| "valid"
	| "invalid"
	| "unsupported"
	| "checking";
