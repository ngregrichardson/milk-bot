import { config } from "dotenv";
import { ActivityOptions, Client, Intents } from "discord.js";
import { join } from "path";

/**
 * Initialize environment files
 */
config();

/**
 * Initialize Discord client
 */
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.once("ready", () => {
  console.log("Bot online.");
});

client.login(process.env.BOT_TOKEN);
