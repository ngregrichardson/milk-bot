import { Client, Message } from "discord.js";
import { getGifUrl } from "../utils/tenor";

const keywords = ["😢", "😭", "😿", "😥", "cry", "sad", ":sad", "depressed"];

export default {
    name: ["messageCreate", "messageUpdate"],
    execute: async (
        client: Client,
        oldMessage: Message,
        newMessage: Message
    ) => {
        const message = newMessage || oldMessage;

        if (message.author.id === client.user!.id) return;

        for (const keyword of keywords) {
            let content: string | string[] = message.content?.toLowerCase();

            if (/^[a-zA-Z]+$/.test(keyword)) {
                content = content.split(" ");
            }

            if (content.includes(keyword)) {
                try {
                    await message.reply({
                        content: `don't cry over spilt milk ${await getGifUrl()}`,
                    });
                    return;
                } catch (error) {
                    console.error(error);
                }
            }
        }
    },
};
