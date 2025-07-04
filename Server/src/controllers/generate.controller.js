import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateCaption, reGenerateCaption } from "../apis/caption.api.js";
import { generateSummary, reGenerateSummary } from "../apis/summary.api.js";


const captionController = asyncHandler(async (req, res) => {

    try {

        const fileBuffer = req.file?.buffer;
        const mimeType = req.file?.mimetype;

        if (!fileBuffer) {
            throw new ApiError(400, "Please upload an Image");
        }

        const caption = await generateCaption(fileBuffer, mimeType);


        const cleanCaptions = caption.replace(/Here are.*?:/, '').trim(); // Removes intro text

        const data = cleanCaptions.split("\n\n");

        const response = new ApiResponse(200, data, "Caption generated successfully");

        res.json(response);

    } catch (error) {
        console.error('Error in captionController:', error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})



const reCaptionController = asyncHandler(async (req, res) => {

    try {
        const oldCaption = req.body.oldCaption;

        if (!oldCaption) {
            throw new ApiError(400, "Please give an old caption");
        }

        const newCaption = await reGenerateCaption(oldCaption);

        const cleanCaptions = newCaption.replace(/Here are.*?:/, '').trim(); // Removes intro text

        const data = cleanCaptions.split("\n\n");

        const response = new ApiResponse(200, data, "Caption generated successfully");

        res.json(response);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


const summaryController = asyncHandler(async (req, res) => {

    try {
        const url = req.body.url;

        if (!url) {
            throw new ApiError(400, "Please provide url");
        }

        const summary = await generateSummary(url);

        // const cleanCaptions = newCaption.replace(/Here are.*?:/, '').trim(); // Removes intro text

        // const data = cleanCaptions.split("\n\n");

        const response = new ApiResponse(200, data, "Summary generated successfully");

        res.json(response);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


const reSummaryController = asyncHandler(async (req, res) => {

    try {
        const oldSummary = req.body.oldSummary;

        if (!oldSummary) {
            throw new ApiError(400, "Please give an old summary");
        }

        const newSummary = await reGenerateSummary(oldSummary);

        // const cleanCaptions = newCaption.replace(/Here are.*?:/, '').trim(); // Removes intro text

        // const data = cleanCaptions.split("\n\n");

        const response = new ApiResponse(200, newSummary, "Summary generated successfully");

        res.json(response);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export { captionController, reCaptionController, summaryController, reSummaryController };