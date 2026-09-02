export function Fact({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-2 border-b border-border/30 py-1.5">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-mono font-medium">{value}</span>
		</div>
	);
}
