import { ImageAnnotatorClient } from "@google-cloud/vision";

const client = new ImageAnnotatorClient({
	credentials: process.env.GCP_CREDENTIALS ? JSON.parse(process.env.GCP_CREDENTIALS) : undefined,
});

export const getImageText = async (url: string) => {
	try {
		const [result] = await client.textDetection(url);

		if (!result.textAnnotations || result.textAnnotations.length === 0) {
			throw Error("No text found");
		}

		return (
			result.textAnnotations?.reduce(
				(acc, curr) => acc + (curr.description || ""),
				"",
			) || ""
		);
	} catch (e) {
		console.error(e);
	}

	return "";
};
