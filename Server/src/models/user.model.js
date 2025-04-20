import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { ACCESS_TOKEN_EXPIRE_IN_DAYS, REFRESH_TOKEN_EXPIRE_IN_DAYS } from "../constants.js";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dr1ktryw0/image/upload/v1736097744/samples/people/boy-snow-hoodie.jpg"
    },
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "history",
    }]
}, {
    timestamps: true
});

const userdetails = mongoose.model("userdetails", userSchema);

export default userdetails;