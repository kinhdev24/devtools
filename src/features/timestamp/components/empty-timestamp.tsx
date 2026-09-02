import { Clock3Icon } from "lucide-react";
import { Button } from "#/components/ui/button";
import * as m from "#/paraglide/messages.js";
import { EXAMPLES } from "../constants";

export function EmptyTimestamp({
	onExample,
}: {
	onExample: (val: string) => void;
}) {
	return (
		<div className="flex min-h-[350px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/60 px-4 text-center">
			<div className="flex size-14 items-center justify-center rounded-full border border-border/40 bg-muted/50 shadow-sm backdrop-blur-sm">
				<Clock3Icon className="size-6 text-muted-foreground" />
			</div>
			<div className="max-w-sm">
				<p className="text-base font-semibold">{m.timestamp_empty_title()}</p>
				<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
					{m.timestamp_empty_description()}
				</p>
			</div>
			<div className="mt-2 flex flex-wrap items-center justify-center gap-2">
				{EXAMPLES.map((example) => (
					<Button
						key={example.label}
						variant="outline"
						size="sm"
						className="h-7 text-[11px]"
						onClick={() => onExample(example.value)}
					>
						{example.label}
					</Button>
				))}
			</div>
		</div>
	);
}
