import { ApiError } from "../utils/ApiError.js";
import { GoogleGenAI, createUserContent } from "@google/genai";
import { getTranscript } from "../utils/youtube.transcripts.js";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Extract YouTube video ID from any valid URL
function extractVideoId(url) {
    try {
        const match = url.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
        );

        const videoId = match?.[1];
        if (!videoId) throw new ApiError(400, "Provide a valid YouTube URL");
        return videoId;
    } catch (error) {
        throw new ApiError(400, "Video ID not found");
    }
}

// Generate summary from transcript
const generateSummary = async (url) => {
    try {
        const videoId = extractVideoId(url);

        const transcript = await getTranscript(videoId); // already returns joined text
        if (!transcript || transcript.trim().length === 0) {
            throw new ApiError(404, "No captions found for this video");
        }

        // Get title via YouTube's oEmbed
        const { data } = await axios.get(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const title = data.title;

        const geminiPrompt = `Title: ${title}\n\nTranscript: ${transcript}\n\nGive a concise and clear summary for the above content.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-pro",
            contents: [createUserContent([geminiPrompt])],
        });

        const summary = response.text;
        return { title, summary };

    } catch (error) {
        console.error("Error generating YouTube summary:", error.message);
        throw new ApiError(500, "Failed to generate YouTube summary");
    }
};

const reGenerateSummary = async (oldSummary) => {
    try {

        if (!oldSummary) throw new ApiError(400, "Please provide old summary");

        const response = await ai.models.generateContent({
            model: "gemini-2.0-pro",
            contents: [
                createUserContent([
                    `${oldSummary}\n\n Simplify this summary in easy way.`,
                ]),
            ],
        });

        return response.text

    } catch (error) {
        console.error("Error re-generating YouTube summary:", error);
        throw new ApiError(500, "Failed to re-generate YouTube summary");
    }
};


export { generateSummary, reGenerateSummary };