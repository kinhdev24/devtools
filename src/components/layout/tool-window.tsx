import * as React from "react";
import { cn } from "#/lib/utils";

export const ToolWindow = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-shadow focus-within:ring-1 focus-within:ring-ring",
			className,
		)}
		{...props}
	/>
));
ToolWindow.displayName = "ToolWindow";

export const ToolWindowHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { title?: string; noDots?: boolean }
>(({ className, title, noDots = false, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex flex-wrap items-center gap-2 border-b border-border/40 bg-muted/20 px-4 py-2.5",
			className,
		)}
		{...props}
	>
		{!noDots && (
			<div className="flex gap-1.5 mr-2">
				<div className="size-2.5 rounded-full bg-destructive/80" />
				<div className="size-2.5 rounded-full bg-amber-500/80" />
				<div className="size-2.5 rounded-full bg-emerald-500/80" />
			</div>
		)}
		{title && (
			<span className="font-mono text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
				{title}
			</span>
		)}
		{children}
	</div>
));
ToolWindowHeader.displayName = "ToolWindowHeader";

export const ToolWindowToolbar = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("ml-auto flex items-center gap-1", className)}
		{...props}
	/>
));
ToolWindowToolbar.displayName = "ToolWindowToolbar";

export const ToolWindowContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col flex-1", className)} {...props} />
));
ToolWindowContent.displayName = "ToolWindowContent";
