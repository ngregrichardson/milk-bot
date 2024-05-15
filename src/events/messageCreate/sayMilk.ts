import type { Client, Message } from "discord.js";
import milkSay from "../messageUpdate/sayMilk";

export default async (message: Message, client: Client<true>) => {
    return milkSay(undefined, message, client);
};