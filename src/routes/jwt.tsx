import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { JwtPage } from "#/features/jwt/page";

const jwtSearchSchema = z.object({
	token: z.string().optional(),
});

export const Route = createFileRoute("/jwt")({
	validateSearch: (search) => jwtSearchSchema.parse(search),
	component: JwtPage,
});
