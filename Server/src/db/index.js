import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const dbconnect = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        // console.log("Database connected successfully", dbInstance.connection.host);
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

export default dbconnect;