import type { Client, Message } from "discord.js";
import saySad from "../messageUpdate/saySad";

export default async (message: Message, client: Client<true>) => {
    return saySad(undefined, message, client);
};