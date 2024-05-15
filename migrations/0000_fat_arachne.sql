CREATE TABLE IF NOT EXISTS "sad_messages" (
	"message_id" text NOT NULL,
	"reply_id" text NOT NULL,
	CONSTRAINT "sad_messages_message_id_reply_id_pk" PRIMARY KEY("message_id","reply_id")
);
