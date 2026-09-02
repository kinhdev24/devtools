import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { TimestampPage } from "#/features/timestamp/page";

const timestampSearchSchema = z.object({
	value: z.union([z.string(), z.number()]).transform(String).optional(),
});

export const Route = createFileRoute("/timestamp")({
	validateSearch: (search) => timestampSearchSchema.parse(search),
	component: TimestampPage,
});
