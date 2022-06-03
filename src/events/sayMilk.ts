import { Client, Message } from "discord.js";
import { getTextFromImage } from "../utils/textFromImage";

const keywords = ["milk", "milj", "🥛", "🍼", "🌌"];

export default {
    name: ["messageCreate", "messageUpdate"],
    execute: async (
        client: Client,
        oldMessage: Message,
        newMessage: Message
    ) => {
        const message = newMessage || oldMessage;

        let searchableParts = [];

        if (message.content) {
            searchableParts.push(message.content || "");
        }

        if (message.attachments) {
            searchableParts = [
                ...searchableParts,
                ...message.attachments.map((a) => a.name),
            ];

            for (const attachment of Array.from(message.attachments.values())) {
                const foundText = await getTextFromImage(attachment.url);

                if (foundText) {
                    searchableParts.push(foundText);
                }
            }
        }

        for (const keyword of keywords) {
            let hasMilk = false;
            for (const part of searchableParts) {
                if (part?.toLowerCase().includes(keyword.toLowerCase())) {
                    hasMilk = true;
                    break;
                }
            }

            if (hasMilk) {
                try {
                    await message.react("🥛");
                    return;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        if (newMessage) {
            const milkBotReactions = message.reactions.cache.filter(
                (reaction) => reaction.emoji.name === "🥛" && reaction.me
            );

            try {
                milkBotReactions.forEach((reaction) => {
                    reaction.users.remove(client.user!.id);
                });
            } catch (error) {
                console.error("Failed to remove reactions.");
            }
        }
    },
};
