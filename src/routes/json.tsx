import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { JsonPage } from "#/features/json/page";

const jsonSearchSchema = z.object({
	input: z.string().optional(),
});

export const Route = createFileRoute("/json")({
	validateSearch: (search) => jsonSearchSchema.parse(search),
	component: JsonPage,
});
