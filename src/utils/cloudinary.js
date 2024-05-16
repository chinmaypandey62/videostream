import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs"; //used to handle files using node (file system)


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async function(localFilePath) {
    try {
        if(!localFilePath) {
            console.log(`Could not get file path...`);
            return null;
        }

        // files are taken from local and uploaded to cloudinary
        const response = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto",
        });

        console.log(`file uploaded successfully... ${response.url}`);
        return response;
    } 
    catch {
        console.log("Could not upload...");
        fs.unlinkSync(localFilePath); 
        //to delete the trash file from local as the file could not be uploaded

        return null;
    }
}

