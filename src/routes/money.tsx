import { createFileRoute } from "@tanstack/react-router";
import { toolsById } from "#/config/tools";
import { ComingSoonPage } from "#/features/coming-soon/page";

export const Route = createFileRoute("/money")({ component: MoneyPage });

function MoneyPage() {
	return <ComingSoonPage item={toolsById.money} />;
}
