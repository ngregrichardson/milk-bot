import Tesseract from "tesseract.js";

export const getTextFromImage = async (url: string): Promise<string> => {
    return new Promise((res, rej) => {
        Tesseract.recognize(url, "eng")
            .then(({ data: { text } }) => res(text))
            .catch(rej);
    })
};
