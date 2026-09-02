import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/text")({ component: TextPage });

function TextPage() {
	return <ComingSoonPage item={toolsById.text} />;
}
