import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    paymentIntentId: { type: String, required: true }, // from Stripe
}, { timestamps: true });

export default mongoose.model("Payment", PaymentSchema);
