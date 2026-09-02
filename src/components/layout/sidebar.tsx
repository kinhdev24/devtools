import { Link, useRouterState } from "@tanstack/react-router";
import { HomeIcon, Settings2Icon } from "lucide-react";

import { toolsByCategory } from "#/config/tools";
import { getToolName } from "#/lib/tool-messages";
import * as m from "#/paraglide/messages.js";

const groups = [
	{ id: "developer", label: m.nav_developer, tools: toolsByCategory.developer },
	{ id: "media", label: m.nav_media, tools: toolsByCategory.media },
	{ id: "vietnam", label: m.nav_vietnam, tools: toolsByCategory.vietnam },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<nav aria-label="Primary" className="flex h-full flex-col gap-5 px-3 py-4">
			<Link
				to="/"
				onClick={onNavigate}
				className="nav-item"
				data-active={pathname === "/"}
			>
				<HomeIcon aria-hidden="true" />
				<span>{m.nav_home()}</span>
			</Link>

			<div className="flex flex-1 flex-col gap-5">
				{groups.map((group) => (
					<section key={group.id} className="flex flex-col gap-1">
						<h2 className="px-2 pb-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
							{group.label()}
						</h2>
						{group.tools.map((tool) => {
							const Icon = tool.icon;
							return (
								<a
									key={tool.id}
									href={tool.path}
									onClick={onNavigate}
									className="nav-item"
									data-active={pathname === tool.path}
								>
									<Icon aria-hidden="true" />
									<span className="truncate">{getToolName(tool.nameKey)}</span>
								</a>
							);
						})}
					</section>
				))}
			</div>

			<a
				href="/settings"
				onClick={onNavigate}
				className="nav-item"
				data-active={pathname === "/settings"}
			>
				<Settings2Icon aria-hidden="true" />
				<span>{m.nav_settings()}</span>
			</a>
		</nav>
	);
}
