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
                    "Give 1 popular instagram caption with 4 hashtags, no introductory text",
                    createPartFromUri(image.uri, image.mimeType),
                ]),
            ],
        });

        return response.text;

    } catch (error) {
        console.error('Error generating caption:', error);
        throw new ApiError(500, "Error generating caption");
    }
}


const reGenerateCaption = async (oldCaption) => {

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                createUserContent([

                    `Old caption: "${oldCaption}". Give 1 popular instagram caption with 4 hashtags, no introductory text.`,

                ]),
            ],
        });

        return response.text;

    } catch (error) {
        console.error('Error generating caption:', error);
        throw new ApiError(500, "Error generating caption");
    }
}

export { generateCaption, reGenerateCaption };