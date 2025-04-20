import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoUrl: { type: String, required: true },
    summary: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Summary", SummarySchema);
