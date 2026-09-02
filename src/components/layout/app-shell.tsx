import type { ReactNode } from "react";

import { Sidebar } from "#/components/layout/sidebar";
import { TopNav } from "#/components/layout/top-nav";

export function AppShell({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-dvh overflow-hidden bg-background text-foreground">
			<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
				<TopNav />
				<div className="flex min-h-0 flex-1 overflow-hidden">
					<aside className="hidden h-full w-56 shrink-0 overflow-y-auto border-r border-border/40 bg-sidebar md:block z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
						<Sidebar />
					</aside>
					<main className="relative min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-background/50">
						{/* Global subtle dot grid background */}
						<div
							className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05] z-[-1]"
							style={{
								backgroundImage:
									"radial-gradient(circle at center, currentColor 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						/>
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
