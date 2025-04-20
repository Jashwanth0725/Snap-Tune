import axios from "axios";
import { parseStringPromise } from "xml2js";

export const getTranscript = async (videoId) => {
    try {
        const url = `https://video.google.com/timedtext?lang=en&v=${videoId}`;
        const response = await axios.get(url);
        const xml = response.data;

        const parsed = await parseStringPromise(xml);
        const texts = parsed.transcript.text;

        if (!texts || texts.length === 0) {
            throw new Error("No captions found.");
        }

        const transcript = texts.map((t) => t._).join(" ");
        return transcript;
    } catch (error) {
        console.error("Error fetching YouTube transcript:", error.message);
        throw new Error("Transcript not available. Make sure the video has captions.");
    }
};
