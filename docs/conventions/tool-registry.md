# Tool Registry

Every tool must be registered centrally.

## Shape

type ToolDefinition = {
id: string
path: string

nameKey: string
descriptionKey: string

category: ToolCategory

aliases: string[]

local: boolean
}

## Example

{
id: "image",
path: "/image",

nameKey: "tools.image.name",
descriptionKey: "tools.image.description",

category: "media",

aliases: [
"image",
"png",
"jpg",
"jpeg",
"webp",
"avif",
"compress",
"resize"
],

local: true
}

## Rule

Registry metadata is language-independent.

Display text comes from translations.
