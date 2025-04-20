import mongoose from "mongoose";

const CaptionSchema = new mongoose.Schema({
    user: { type: String, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Caption", CaptionSchema);
