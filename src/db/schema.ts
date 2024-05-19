import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const sadMessagesTable = pgTable(
	"sad_messages",
	{
		messageId: text("message_id").notNull(),
		replyId: text("reply_id").notNull(),
	},
	(table) => ({
		pk: primaryKey({
			columns: [table.messageId, table.replyId],
		}),
	}),
);

export const milkMessagesTable = pgTable("milk_messages", {
	messageId: text("message_id").primaryKey(),
});
