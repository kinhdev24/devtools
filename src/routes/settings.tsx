import { createFileRoute } from "@tanstack/react-router";
import {
	ComingSoonPage,
	settingsComingSoonItem,
} from "#/features/coming-soon/page";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
	return <ComingSoonPage item={settingsComingSoonItem} />;
}
