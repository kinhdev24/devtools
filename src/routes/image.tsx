import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/image")({ component: ImagePage });

function ImagePage() {
	return <ComingSoonPage item={toolsById.image} />;
}
