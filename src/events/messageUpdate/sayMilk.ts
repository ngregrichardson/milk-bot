import type { Client, Message } from "discord.js";
import { reactWithMilk, removeMilkReactions } from "../../utils/milk";
import { messageContainsAnyTarget } from "../../utils/strings";
import { db } from "../../db/db";
import { milkMessagesTable } from "../../db/schema";
import { eq } from "drizzle-orm";

const MILK_TARGETS = [
    "milk",
    "dairy",
    "cow",
    "cattle",
    "bovine",
    "moo",
    "udder",
    "teat",
    "tit",
    "cream",
    "butter",
    "cheese",
    "yogurt",
    "whey",
    "casein",
    "lactose",
    "colostrum",
    "curd",
    "kefir",
    "lactic",
    "lactation",
    "lactate",
    "melk",
    "malk",
    "milj",
    "mulk",
    "mylk",
    "milke",
    "myulk",
    "millk",
    "🥛",
    "🐄",
    "🐮",
    "🍼",
    "🧀",
    "🍦",
    "🍨"
];

export default async (_: Message | undefined, message: Message, client: Client<true>) => {
    const newMessageHasMilk = messageContainsAnyTarget(message, MILK_TARGETS);

    const existingMessage = await db.query.milkMessagesTable.findFirst({
        where: eq(milkMessagesTable.messageId, message.id)
    });

    if(newMessageHasMilk) {
        if(!existingMessage) {
            try {
                await reactWithMilk(message);

                await db.insert(milkMessagesTable).values({
                    messageId: message.id
                });
            }catch {}
        }
    }else {
        if(existingMessage) {
            try {
                await removeMilkReactions(message, client);

                await db.delete(milkMessagesTable).where(eq(milkMessagesTable.messageId, message.id));
            }catch {}
        }
    }
};