import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
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
    }
}, {
    timestamps: true,
});

export const userdetails = mongoose.model("userdetails", userSchema);