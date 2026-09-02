import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, BookTemplateIcon } from "lucide-react";
import {
	ToolWindow,
	ToolWindowHeader,
	ToolWindowToolbar,
} from "#/components/layout/tool-window";
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group";
import { Button } from "#/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "#/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import * as m from "#/paraglide/messages.js";
import { getLocale } from "#/paraglide/runtime.js";
import type { RegexFlag } from "../types";
import type { RegexPreset } from "../presets";
import { REGEX_PRESETS } from "../presets";

const FLAGS: RegexFlag[] = ["g", "i", "m", "s", "u", "y"];

export function RegexEditor({
	pattern,
	flags,
	onPatternChange,
	onFlagsChange,
	onPresetSelect,
}: {
	pattern: string;
	flags: RegexFlag[];
	onPatternChange: (value: string) => void;
	onFlagsChange: (value: RegexFlag[]) => void;
	onPresetSelect: (preset: RegexPreset) => void;
}) {
	const [open, setOpen] = useState(false);
	const isVi = getLocale() === "vi";

	return (
		<ToolWindow className="col-span-1 md:col-span-12 h-32 flex flex-col shrink-0">
			<ToolWindowHeader title="editor://regex">
				<ToolWindowToolbar>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								role="combobox"
								aria-expanded={open}
								className="h-7 border-border/40 font-mono text-xs w-[190px] justify-between bg-card"
							>
								<div className="flex items-center gap-1.5 truncate">
									<BookTemplateIcon className="size-3.5 shrink-0" />
									<span className="truncate">{m.regex_presets_button()}</span>
								</div>
								<ChevronsUpDownIcon className="ml-2 h-3 w-3 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-[340px] rounded-xl border-border/40 bg-card/60 p-1 shadow-sm backdrop-blur-xl"
							align="end"
						>
							<Command className="bg-transparent [&_[data-slot=command-input-wrapper]]:border-none [&_[data-slot=command-input-wrapper]]:h-10">
								<CommandInput placeholder={m.regex_presets_search()} className="text-xs" />
								<CommandList className="max-h-[300px] mt-1">
									<CommandEmpty>{m.regex_presets_empty()}</CommandEmpty>
									<CommandGroup>
										{REGEX_PRESETS.map((preset) => (
											<CommandItem
												key={preset.id}
												value={preset.id}
												onSelect={() => {
													onPresetSelect(preset);
													setOpen(false);
												}}
												className="flex flex-col items-start gap-0.5 py-1.5 px-2.5 data-[selected=true]:bg-muted/50"
											>
												<div className="flex w-full items-center justify-between">
													<span className="font-medium text-xs">
														{isVi ? preset.nameVi : preset.nameEn}
													</span>
													{pattern === preset.pattern && (
														<CheckIcon className="size-3.5 text-primary" />
													)}
												</div>
												<span className="font-mono text-[9px] text-muted-foreground truncate w-full text-left">
													{preset.pattern}
												</span>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</ToolWindowToolbar>
			</ToolWindowHeader>
			<div className="flex flex-1 items-center gap-4 p-4">
				<div className="flex-1 min-w-0">
					<div className="flex items-center h-14 rounded-xl border border-border/50 bg-background/50 px-4 shadow-inner focus-within:ring-1 focus-within:ring-ring focus-within:border-primary/50 transition-colors">
						<span className="text-xl text-muted-foreground/60 font-mono font-light select-none mr-2">
							/
						</span>
						<input
							value={pattern}
							onChange={(event) => onPatternChange(event.target.value)}
							placeholder={m.regex_input_placeholder()}
							className="flex-1 h-full bg-transparent text-lg font-mono outline-none placeholder:text-muted-foreground/50 min-w-0"
							spellCheck={false}
						/>
						<span className="text-xl text-muted-foreground/60 font-mono font-light select-none ml-2">
							/
						</span>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase ml-1">
						{m.regex_flags_label()}
					</span>
					<ToggleGroup
						type="multiple"
						value={flags}
						onValueChange={(value) => onFlagsChange(value as RegexFlag[])}
						variant="outline"
						className="justify-start"
					>
						{FLAGS.map((flag) => (
							<ToggleGroupItem
								key={flag}
								value={flag}
								aria-label={flag}
								className="font-mono text-xs size-8"
							>
								{flag}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
			</div>
		</ToolWindow>
	);
}
