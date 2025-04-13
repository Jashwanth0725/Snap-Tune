import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import userdetails from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import validator from 'validator';


const generateAccessAndRefereshToken = async (userID) => {
    try {

        const user = await userdetails.findById(userID);
        const accessToken = user.createAccessToken();
        const refreshToken = user.createRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (err) {
        throw new ApiError(500, "Failed to generate access and refresh token");
    }

}

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
        profilePic: profilePicUrl?.url || undefined,
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



const loginUser = asyncHandler(async (req, res) => {

    //take email and password from frontend
    //Is email already registed?
    //If not say not registered
    //If yes, is password correct?
    //If not say wrong password dude
    //If yes, create a token and send it to frontend
    //send cookie with token
    //return response

    const { userName, email, password } = req.body;

    const data = req.body;

    if (!email || !userName) {
        throw new ApiError(400, "Email and username are required");
    }


    const user = await userdetails.findOne({
        $or: [{ email }, { userName }]
    })

    if (!user) {
        throw new ApiError(400, "User not found", data);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id);

    const loggedInUser = await userdetails.findById(user._id).select("-password -refreshToken");

    if (!loggedInUser) {
        throw new ApiError(500, "Failed to login user");
    }

    const cookiesOptions = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(new ApiResponse(200,
            {
                user: loggedInUser, accessToken, refreshToken
            }, "User Logged In Successfully"));
});


const logOutUser = asyncHandler(async (req, res) => {

    await userdetails.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        });

    const cookiesOptions = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", cookiesOptions)
        .clearCookie("refreshToken", cookiesOptions)
        .json(new ApiResponse(200, {}, "User Looged Out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const { incomingRefreshToken } = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request, wrong refresh token");
    }

    try {

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await userdetails.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token, no user found");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired");
        }

        const options = {
            httpOnly: true,
            secure: true,
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, {
                accessToken: accessToken,
                refreshToken: newRefreshToken,
            }, "Access token refreshed successfully"));

    } catch (error) {
        throw new ApiError(500, "Failed to refresh AccessToken: ", error?.message);
    }

});

export { registerUser, loginUser, logOutUser, refreshAccessToken };