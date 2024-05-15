import { Client, Message } from "discord.js";

export const reactWithMilk = (message: Message) => {
    return message.react("🥛");
}

export const removeMilkReactions = async (message: Message, client: Client<true>) => {
    const botReactions = message.reactions.cache.filter(r => r.emoji.name === "🥛" && r.me);

    return Promise.allSettled(botReactions.map(reaction => reaction.users.remove(client.user.id)));
}