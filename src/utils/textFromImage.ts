import extractTextFromImage from "node-text-from-image";

export const getTextFromImage = async (url: string) => {
    try {
        const request = await fetch(url);
        const buffer = Buffer.from(await request.arrayBuffer());

        return extractTextFromImage(buffer);
    } catch (e) {
        console.error(e);
    }

    return null;
};
