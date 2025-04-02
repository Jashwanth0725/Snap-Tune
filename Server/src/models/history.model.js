import mongoose from "mongoose";
import mongooseaggregatePaginate from "mongoose-aggregate-paginate-v2";

const historySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    music: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment"
    },
}, {
    timestamps: true,
})


historySchema.plugin(mongooseaggregatePaginate);

export const history = mongoose.model("history", historySchema);