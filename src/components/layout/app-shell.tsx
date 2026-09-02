import type { ReactNode } from "react";

import { Sidebar } from "#/components/layout/sidebar";
import { TopNav } from "#/components/layout/top-nav";

export function AppShell({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-dvh overflow-hidden bg-background text-foreground">
			<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
				<TopNav />
				<div className="flex min-h-0 flex-1 overflow-hidden">
					<aside className="hidden h-full w-56 shrink-0 overflow-y-auto border-r bg-sidebar md:block">
						<Sidebar />
					</aside>
					<main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
