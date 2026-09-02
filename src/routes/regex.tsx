import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/regex")({ component: RegexPage });

function RegexPage() {
	return <ComingSoonPage item={toolsById.regex} />;
}
