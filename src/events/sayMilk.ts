import { Client, Message } from "discord.js";

const keywords = ["milk", "milj", "🥛", "🍼", "🌌"];

export default {
  name: ["messageCreate", "messageUpdate"],
  execute: async (client: Client, oldMessage: Message, newMessage: Message) => {
    const message = newMessage || oldMessage;

    for (const keywordIndex in keywords) {
      if (message.content?.toLowerCase().includes(keywords[keywordIndex])) {
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
