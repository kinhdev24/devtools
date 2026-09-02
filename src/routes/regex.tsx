import { RegexPage } from "#/features/regex/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/regex")({
	component: RegexPage,
});
