import { config } from "dotenv";
import "isomorphic-fetch";
import { Client, Collection, Command, Intents } from "discord.js";
import registerCommands from "./utils/registerCommands";
import registerEvents from "./utils/registerEvents";

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
client.commands = new Collection<unknown, Command>();

client.once("ready", () => {
    console.log("Bot online.");

    if (process.env.IS_PROD) {
        client.guilds.fetch().then((guilds) => {
            guilds.forEach((guild) => {
                guild.fetch().then((g) => g.commands.set([]));
            });
        });
    }

    registerCommands(client);

    registerEvents(client);
});

client.login(process.env.BOT_TOKEN);
