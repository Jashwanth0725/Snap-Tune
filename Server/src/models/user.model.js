import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ACCESS_TOKEN_EXPIRE_IN_MINUTES, REFRESH_TOKEN_EXPIRE_IN_DAYS } from "../constants.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    profilePic: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/78-786778_profile-picture-placeholder-png-transparent-png.png",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: [6, "Password must be atleast 6 letters long"],
        max: 12,
    },
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "history",
    }],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true,
});

//Password will be encrypted before saving it to the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

//This compares the password enterd by user and the password stored in database.
//This return true or false
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


//This method generates JWT token for user
userSchema.methods.createAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECERET, {
        expiresIn: ACCESS_TOKEN_EXPIRE_IN_MINUTES
    })
}

//This method generate refresh token which is used to get new access token when the old one expires
//This method is called when user login or registers
userSchema.methods.createRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECERET, {
        expiresIn: REFRESH_TOKEN_EXPIRE_IN_DAYS
    })
}


export const userdetails = mongoose.model("userdetails", userSchema);