import type { Client, Message } from "discord.js";
import { messageContainsAnyTarget } from "../../utils/strings";
import { getGifUrl } from "../../utils/tenor";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { sadMessagesTable } from "../../db/schema";

const SAD_TARGETS = ["😢", "😭", "😿", "😥", "cry", "sad", ":sad", "depressed"];

export default async (
	_: Message | undefined,
	message: Message,
	client: Client<true>,
) => {
	if (message.author.id === client.user.id) {
		return;
	}

	const newMessageIsSad = await messageContainsAnyTarget(
		message,
		SAD_TARGETS,
		true,
	);

	const existingMessage = await db.query.sadMessagesTable.findFirst({
		where: eq(sadMessagesTable.messageId, message.id),
	});

	if (newMessageIsSad) {
		if (!existingMessage) {
			try {
				const reply = await message.reply(
					`Don't cry over spilt milk! ${await getGifUrl("spilt milk")}`,
				);

				await db.insert(sadMessagesTable).values({
					messageId: message.id,
					replyId: reply.id,
				});
			} catch {}
		}
	} else {
		if (existingMessage) {
			try {
				await message.channel.messages.delete(existingMessage.replyId);
			} catch {}

			try {
				await db
					.delete(sadMessagesTable)
					.where(eq(sadMessagesTable.messageId, message.id));
			} catch {}
		}
	}
};
