import { ApiError } from "../utils/ApiError.js";
import pkg from "@google/genai";
const { GoogleGenAI, createUserContent } = pkg;

const generateCaption = async (fileBuffer, mimeType) => {

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const image = {
            inlineData: {
                data: fileBuffer.toString('base64'),
                mimeType: mimeType
            }
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                createUserContent([
                    "Give 1 popular instagram caption with 4 hashtags, no introductory text",
                    image
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