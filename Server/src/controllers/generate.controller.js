import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateCaption } from "../apis/caption.api.js";
import fs from 'fs';

const generateController = asyncHandler(async (req, res) => {

    try {

        const imagePath = req.file?.path;

        if (!imagePath) {
            throw new ApiError(400, "Please upload an Image");
        }

        const uploadedImage = await uploadOnCloudinary(imagePath);

        if (!uploadedImage) {
            throw new ApiError(500, "Failed to upload image on cloudinary");
        }

        const caption = await generateCaption(imagePath);

        fs.unlinkSync(imagePath);

        // const music = await generateMusic(caption);

        const cleanCaptions = caption.replace(/Here are.*?:/, '').trim(); // Removes intro text

        const lines = cleanCaptions.split("\n\n");

        const data = [lines, uploadedImage.url];

        const response = new ApiResponse(200, data, "Caption generated successfully");

        res.json(response);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


export { generateController };