import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME',
    api_key: 'process.env.CLOUDINARY_API_KEY',
    api_secret: 'process.env.CLOUDINARY_API_SECRET',
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;

        const uploadResult = await cloudinary.uploader.upload
            (filePath,
                {
                    resource_type: 'auto', //type of file
                })
        console.log("uploadResult", uploadResult.url);
        return uploadResult;
    }
    catch (err) {
        fs.unlinkSync(filePath, (err) => {
            if (err) {
                console.log("Error detected", err);
            }
            else {
                console.log("file uploaded successfully");
            }
        })

        return null;
    }
}