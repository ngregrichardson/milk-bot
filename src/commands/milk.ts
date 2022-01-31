import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import fetch from "node-fetch";

const execute = async (interaction: CommandInteraction) => {
  fetch("https://g.tenor.com/v1/random?q=milk&key=API_KEY&limit=1")
    .then((res: object) => {
      console.log(res);
    })
    .catch((e: Error) => console.error(e));
};

export default {
  data: new SlashCommandBuilder().setName("milk").setDescription("Milk!"),
  execute,
};
