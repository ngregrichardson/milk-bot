import { Message } from "discord.js";

const containsAnyTarget = (content: string | undefined, targets: string[]) => {
    if(!content) {
        return false;
    }

    content = content.toLowerCase();

    for(const target of targets) {
        if(content.includes(target)) {
            return true;
        }
    }

    return false;
}

export const messageContainsAnyTarget = (message: Message, targets: string[]) => {
    if(containsAnyTarget(message.content, targets)) {
        return true;
    }

    if(message.attachments) {
        const attachments = Array.from(message.attachments.values());

        for(const attachment of attachments) {
            if(containsAnyTarget(attachment.name, targets)) {
                return true;
            }
        }
        
        // TODO image validation
    }

    return false;
}