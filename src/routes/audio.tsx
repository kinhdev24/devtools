import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/audio")({ component: AudioPage });

function AudioPage() {
	return <ComingSoonPage item={toolsById.audio} />;
}
