import type { Message } from "discord.js";
import { getImageText } from "./vision";

const containsAnyTarget = (content: string | undefined, targets: string[]) => {
	if (!content) {
		return false;
	}

	const lcontent = content.toLowerCase();

	for (const target of targets) {
		if (lcontent.includes(target)) {
			return true;
		}
	}

	return false;
};

export const messageContainsAnyTarget = async (
	message: Message,
	targets: string[],
	skipImages = false,
) => {
	if (containsAnyTarget(message.content, targets)) {
		return true;
	}

	if (message.attachments) {
		const attachments = Array.from(message.attachments.values());

		for (const attachment of attachments) {
			if (containsAnyTarget(attachment.name, targets)) {
				return true;
			}
		}

		if (!skipImages) {
			const results = await Promise.allSettled(
				attachments.map((attachment) =>
					attachment.contentType?.includes("image")
						? getImageText(attachment.url)
						: Promise.reject(),
				),
			);

			for (const result of results) {
				if (
					result.status === "fulfilled" &&
					containsAnyTarget(result.value, targets)
				) {
					return true;
				}
			}
		}
	}

	return false;
};
