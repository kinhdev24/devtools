import {
	AudioLinesIcon,
	BracesIcon,
	Clock3Icon,
	ImageIcon,
	KeyRoundIcon,
	RegexIcon,
	ScanTextIcon,
	WalletCardsIcon,
} from "lucide-react";

export type ToolCategory = "developer" | "media" | "vietnam";

export type ToolDefinition = {
	id: string;
	path: string;
	nameKey: string;
	descriptionKey: string;
	category: ToolCategory;
	aliases: string[];
	local: boolean;
	icon: typeof BracesIcon;
};

export const tools: ToolDefinition[] = [
	{
		id: "json",
		path: "/json",
		nameKey: "tools.json.name",
		descriptionKey: "tools.json.description",
		category: "developer",
		aliases: ["json", "format", "validate"],
		local: true,
		icon: BracesIcon,
	},
	{
		id: "jwt",
		path: "/jwt",
		nameKey: "tools.jwt.name",
		descriptionKey: "tools.jwt.description",
		category: "developer",
		aliases: ["jwt", "token", "decode"],
		local: true,
		icon: KeyRoundIcon,
	},
	{
		id: "timestamp",
		path: "/timestamp",
		nameKey: "tools.timestamp.name",
		descriptionKey: "tools.timestamp.description",
		category: "developer",
		aliases: ["timestamp", "unix", "date", "time"],
		local: true,
		icon: Clock3Icon,
	},
	{
		id: "regex",
		path: "/regex",
		nameKey: "tools.regex.name",
		descriptionKey: "tools.regex.description",
		category: "developer",
		aliases: ["regex", "regexp", "pattern"],
		local: true,
		icon: RegexIcon,
	},
	{
		id: "image",
		path: "/image",
		nameKey: "tools.image.name",
		descriptionKey: "tools.image.description",
		category: "media",
		aliases: ["image", "png", "jpg", "webp", "avif"],
		local: true,
		icon: ImageIcon,
	},
	{
		id: "audio",
		path: "/audio",
		nameKey: "tools.audio.name",
		descriptionKey: "tools.audio.description",
		category: "media",
		aliases: ["audio", "mp3", "wav", "sound"],
		local: true,
		icon: AudioLinesIcon,
	},
	{
		id: "text",
		path: "/text",
		nameKey: "tools.text.name",
		descriptionKey: "tools.text.description",
		category: "vietnam",
		aliases: ["text", "vietnamese", "slug", "unicode"],
		local: true,
		icon: ScanTextIcon,
	},
	{
		id: "money",
		path: "/money",
		nameKey: "tools.money.name",
		descriptionKey: "tools.money.description",
		category: "vietnam",
		aliases: ["money", "vnd", "currency", "number"],
		local: true,
		icon: WalletCardsIcon,
	},
];

export const toolsByCategory = {
	developer: tools.filter((tool) => tool.category === "developer"),
	media: tools.filter((tool) => tool.category === "media"),
	vietnam: tools.filter((tool) => tool.category === "vietnam"),
};

export const toolsById = Object.fromEntries(
	tools.map((tool) => [tool.id, tool]),
) as Record<string, ToolDefinition>;
