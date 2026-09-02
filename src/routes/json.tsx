import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/json")({ component: JsonPage });

function JsonPage() {
	return <ComingSoonPage item={toolsById.json} />;
}
