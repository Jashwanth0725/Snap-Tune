import axios from 'axios';
import { ApiError } from './ApiError.js';

async function getImageBase64(imageUrl) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];
        const base64 = Buffer.from(response.data).toString('base64');
        return { base64, mimeType: contentType };
    } catch (error) {
        console.error('Error getting image base64:', error);
        throw new ApiError(500, "Error getting image base64");
    }
}

export { getImageBase64 };