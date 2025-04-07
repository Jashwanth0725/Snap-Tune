import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { userdetails } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import validator from 'validator';

const registerUser = asyncHandler(async (req, res) => {

    //get user from frontend 
    //validation - not empty, valid email, password length, name length, username length
    //if user already exists?
    //check for images : profile pic
    //upload images to cloudinary - mutler and get url
    //create user object - create entry in db and send response
    //remove password and refresh token from response
    // check for user creations?
    //return response

    const { userName, name, email, password } = req.body;
    console.log(userName, name, email);

    //check for empty fields
    if ([userName, name, password, email].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    //check for existing user
    const existingUser = await userdetails.findOne({
        $or: [{ email }, { userName }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    //check for valid email
    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email");
    }

    //check for strong password
    if (!validator.isStrongPassword(password)) {
        throw new ApiError(400, "Password is not strong");
    }

    //check for profile pic
    const profilePicLocalPath = req.files?.profilePic?.[0]?.path;
    // if (!profilePicLocalPath) {
    //     throw new ApiError(400, "Profile picture is required");
    // }

    // //upload to cloudinary

    const profilePicUrl = await uploadOnCloudinary(profilePicLocalPath);

    // if (!profilePicUrl) {
    //     throw new ApiError(500, "Failed to upload profile picture");
    // }

    //create user object
    const user = await userdetails.create({
        userName,
        name,
        email,
        password,
        profilePic: profilePicUrl?.url || "",
    });

    //remove password and refresh token from response
    const createdUser = await userdetails.findById(user._id).select("-password -refreshToken");

    //check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Falied to create user");
    }

    //return response
    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));

});

export { registerUser };