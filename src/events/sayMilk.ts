import { Client, Message } from "discord.js";
import { getTextFromImage } from "../utils/textFromImage";

const keywords = ["milk", "milj", "🥛", "🍼", "🌌"];

const stringHasMilk = (str: string): boolean => {
    for (const keyword of keywords) {
        if (str.toLowerCase().includes(keyword.toLowerCase())) {
            return true;
        }
    }

    return false;
} 

export default {
    name: ["messageCreate", "messageUpdate"],
    execute: async (
        client: Client,
        oldMessage: Message,
        newMessage: Message
    ) => {
        const message = newMessage || oldMessage;

        let hasMilk = false;

        if (message.content) {
            hasMilk = stringHasMilk(message.content || "");
        }

        if (!hasMilk && message.attachments) {
            const attachments = Array.from(message.attachments.values());
            for(const attachment of attachments) {
                if(attachment.name && stringHasMilk(attachment.name)) {
                    hasMilk = true;
                    break;
                }
            }

            if(!hasMilk) {
                const imagePromises = attachments.map((a) => {
                    if (a.contentType?.toLowerCase().includes("image")) {
                        return getTextFromImage(a.url);
                    } else {
                        return Promise.reject("");
                    }
                });

                Promise.allSettled(imagePromises)
                    .then((results) => {
                        for(const result of results) {
                            if(result.status === "fulfilled" && stringHasMilk(result.value)) {
                                hasMilk = true;
                                break;
                            }
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
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

        if (!hasMilk && newMessage) {
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
