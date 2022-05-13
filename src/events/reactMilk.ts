import { Client, MessageReaction } from "discord.js";

export default {
    name: "messageReactionAdd",
    execute: async (client: Client, messageReaction: MessageReaction) => {
        if (messageReaction.me) return;

        if (
            messageReaction.emoji.name === "🥛" &&
            !messageReaction.users.cache.find(
                (user) => user.id === client.user!.id
            )
        ) {
            await messageReaction.message.react("🥛");
        }
    },
};
