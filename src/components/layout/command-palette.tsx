import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "#/components/ui/command";
import { tools } from "#/config/tools";
import { getToolDescription, getToolName } from "#/lib/tool-messages";
import * as m from "#/paraglide/messages.js";

export function CommandPalette({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const navigate = useNavigate();

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				onOpenChange(!open);
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onOpenChange, open]);

	function select(path: string) {
		onOpenChange(false);
		void navigate({ href: path });
	}

	return (
		<CommandDialog
			open={open}
			onOpenChange={onOpenChange}
			title={m.command_search()}
			description={m.command_hint()}
		>
			<CommandInput placeholder={m.command_placeholder()} />
			<CommandList>
				<CommandEmpty>{m.command_empty()}</CommandEmpty>
				<CommandGroup heading={m.command_hint()}>
					{tools.map((tool) => {
						const Icon = tool.icon;
						return (
							<CommandItem
								key={tool.id}
								value={[getToolName(tool.nameKey), ...tool.aliases].join(" ")}
								onSelect={() => select(tool.path)}
							>
								<Icon />
								<div className="flex min-w-0 flex-col">
									<span>{getToolName(tool.nameKey)}</span>
									<span className="truncate text-xs text-muted-foreground">
										{getToolDescription(tool.descriptionKey)}
									</span>
								</div>
								<CommandShortcut>↵</CommandShortcut>
							</CommandItem>
						);
					})}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}

export function useCommandPalette() {
	return useState(false);
}
