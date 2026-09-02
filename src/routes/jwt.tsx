import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/jwt")({ component: JwtPage });

function JwtPage() {
	return <ComingSoonPage item={toolsById.jwt} />;
}
