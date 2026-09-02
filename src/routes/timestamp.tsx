import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/timestamp")({
	component: TimestampPage,
});

function TimestampPage() {
	return <ComingSoonPage item={toolsById.timestamp} />;
}
