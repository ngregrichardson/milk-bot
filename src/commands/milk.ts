import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { getGifUrl } from "../utils/tenor";

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({ content: await getGifUrl() });
};

export default {
    data: new SlashCommandBuilder().setName("milk").setDescription("Milk!"),
    execute,
};
