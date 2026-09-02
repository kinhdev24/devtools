import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeftIcon, FileQuestionIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "#/components/ui/empty";
import * as m from "#/paraglide/messages.js";

export function NotFoundPage() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<Empty className="min-h-full rounded-none border-0 px-4 py-12 sm:px-8">
			<EmptyHeader className="max-w-lg gap-3">
				<EmptyMedia
					variant="icon"
					className="size-12 border bg-background shadow-xs"
				>
					<FileQuestionIcon aria-hidden="true" />
				</EmptyMedia>
				<p className="font-mono text-xs font-medium text-muted-foreground tracking-wider">
					{m.not_found_code()}
				</p>
				<EmptyTitle className="text-2xl sm:text-3xl">
					{m.not_found_title()}
				</EmptyTitle>
				<EmptyDescription className="max-w-md">
					{m.not_found_description()}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="max-w-md">
				<div className="w-full rounded-lg border bg-card p-4 text-left shadow-xs">
					<p className="mb-2 text-xs text-muted-foreground">
						{m.not_found_path_label()}
					</p>
					<code className="block truncate font-mono text-sm text-foreground">
						{pathname}
					</code>
				</div>
				<Button asChild>
					<Link to="/">
						<ArrowLeftIcon aria-hidden="true" />
						{m.not_found_back_home()}
					</Link>
				</Button>
			</EmptyContent>
		</Empty>
	);
}
