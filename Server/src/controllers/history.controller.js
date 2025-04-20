import { History } from '../models/history.model.js'; // Assuming you have a History model
import CaptionSchema from '../models/caption.model.js';
// Controller to get user history based on userId
export const userHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await CaptionSchema.find({ user: userId }).sort({ createdAt: -1 });

        if (!history) {
            return res.status(404).json({ message: "No history found for this user" });
        }

        res.status(200).json({ history });
    } catch (error) {
        console.error("Error fetching user history:", error);
        res.status(500).json({ message: "Error fetching user history" });
    }
};
