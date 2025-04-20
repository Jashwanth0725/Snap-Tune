import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import Caption from "../models/caption.model.js";
import Summary from "../models/summary.model.js";
import fs from "fs";




const captionSaveDatabase = asyncHandler(async (req, res) => {
    const { caption, userId } = req.body;

    if (!caption) throw new ApiError(400, "Caption required");

    if (!userId) {
        throw new ApiError(400, "User ID are required");
    }

    let imagePath;

    try {
        imagePath = req.file?.path;

        if (!imagePath) {
            throw new ApiError(400, "Please upload an image");
        }

        const uploadedImage = await uploadOnCloudinary(imagePath);

        if (!uploadedImage || !uploadedImage.url) {
            throw new ApiError(500, "Failed to upload image to Cloudinary");
        }

        fs.unlinkSync(imagePath);

        const newCaption = await Caption.create({
            user: userId,
            imageUrl: uploadedImage.url,
            caption,
        });

        const response = new ApiResponse(201, newCaption, "Caption saved successfully");
        res.status(201).json(response);

    } catch (error) {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        console.error("Caption Save Error:", error);
        throw new ApiError(500, "Something went wrong while saving the caption");
    }
});



const summarySaveDatabase = asyncHandler(async (req, res) => {
    const { videoUrl, summary, userId } = req.body;

    if (!videoUrl || !summary || !userId) {
        throw new ApiError(400, "Video URL, Summary, and User ID are required");
    }

    try {
        const newSummary = await Summary.create({
            user: userId,
            videoUrl,
            summary,
        });

        const response = new ApiResponse(201, newSummary, "Summary saved successfully");
        res.status(201).json(response);

    } catch (error) {
        console.error("Summary Save Error:", error);
        throw new ApiError(500, "Something went wrong while saving the summary");
    }
});


const userSaveDatabase = asyncHandler(async (req, res) => {

    const { googleId, name, email, profileUrl } = req.body;

    if (!googleId || !email) {
        throw new ApiError(400, "Firebase User ID and Email are required");
    }

    try {
        let user = await userdetails.findOne({ googleId });

        if (!user) {
            user = await userdetails.create({
                googleId,
                name,
                email,
                profileUrl,
            });
        }
        else {
            user.profileUrl = profileUrl;
            await user.save();
        }

        const response = new ApiResponse(201, user, "User details saved successfully");
        res.status(201).json(response);

    } catch (error) {
        console.error("Error saving Firebase user:", error);
        throw new ApiError(500, "Something went wrong while saving user details");
    }
});


const userPayment = asyncHandler(async (req, res) => {



});


export { captionSaveDatabase, summarySaveDatabase, userSaveDatabase, userPayment }


