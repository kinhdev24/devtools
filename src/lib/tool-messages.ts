import * as m from "#/paraglide/messages.js";

const toolNames: Record<string, () => string> = {
	"tools.json.name": m.tools_json_name,
	"tools.jwt.name": m.tools_jwt_name,
	"tools.timestamp.name": m.tools_timestamp_name,
	"tools.regex.name": m.tools_regex_name,
	"tools.image.name": m.tools_image_name,
	"tools.audio.name": m.tools_audio_name,
	"tools.text.name": m.tools_text_name,
	"tools.money.name": m.tools_money_name,
	"settings.name": m.settings_name,
};

const toolDescriptions: Record<string, () => string> = {
	"tools.json.description": m.tools_json_description,
	"tools.jwt.description": m.tools_jwt_description,
	"tools.timestamp.description": m.tools_timestamp_description,
	"tools.regex.description": m.tools_regex_description,
	"tools.image.description": m.tools_image_description,
	"tools.audio.description": m.tools_audio_description,
	"tools.text.description": m.tools_text_description,
	"tools.money.description": m.tools_money_description,
	"settings.description": m.settings_description,
};

export function getToolName(key: string) {
	return toolNames[key]?.() ?? key;
}

export function getToolDescription(key: string) {
	return toolDescriptions[key]?.() ?? key;
}
