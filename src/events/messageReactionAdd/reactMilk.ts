import type { MessageReaction, Client, User } from "discord.js";

export default async (
	reaction: MessageReaction,
	_: User,
	client: Client<true>,
) => {
	if (reaction.me) {
		return;
	}

	const isMilk = reaction.emoji.name === "🥛";

	const hasMilked = reaction.users.cache.find(
		(user) => user.id === client.user.id,
	);

	if (isMilk && !hasMilked) {
		await reaction.message.react("🥛");
	}
};
