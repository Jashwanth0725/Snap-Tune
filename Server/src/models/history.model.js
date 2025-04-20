import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const historySchema = new mongoose.Schema({
    caption: {
        type: String,
        ref: "Caption",
        required: true,
    },
    summary: {
        type: String,
        ref: "Summary",
        required: true,
    },
    user: {
        type: String,
        ref: "User",
        required: true,
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
}, {
    timestamps: true,
});

historySchema.plugin(mongooseAggregatePaginate);

export const History = mongoose.model("History", historySchema);
