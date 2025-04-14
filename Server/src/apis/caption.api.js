import { ApiError } from "../utils/ApiError.js";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

const generateCaption = async (filePath) => {

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const image = await ai.files.upload({
            file: filePath,
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                createUserContent([
                    "Give only 3 short Instagram captions with hashtags, no introductory text",
                    createPartFromUri(image.uri, image.mimeType),
                ]),
            ],
        });
        // fs.unlinkSync(filePath);
        return response.text;

    } catch (error) {
        console.error('Error generating caption:', error);
        throw new ApiError(500, "Error generating caption");
    }
}

export { generateCaption };