import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import { getGifUrl } from "../utils/tenor";

export const data: CommandData = {
	name: "milk",
	description: "Milk 🥛!",
};

export const run = async ({ interaction }: SlashCommandProps) => {
	if (!interaction.replied) {
		await interaction.reply(await getGifUrl("milk"));
	}
};

export const options: CommandOptions = {};
