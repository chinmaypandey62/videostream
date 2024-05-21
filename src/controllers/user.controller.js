import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {    
    // get user details from frontend
    // validation - atleast check if credentials are not empty
    // check if user already exists : username or email
    // check for images, check for avatar
    // upload them to cloudinary
    // create a user object due to NoSQL DB as objects are used for operations
    // create a new entry in DB
    // remove password and refresh token field from response
    // recheck for user creation
    // return res
    
    const {fullName, password, email, username} = req.body;
    console.log(req.body); // it is the complete object having key value pair to access the credentials sent by the user

    if([fullName, email, username].some((field) => {
        return field?.trim() === "";
    })) {
        throw new ApiError(400, "All credentials are required!")
    }

    const exstingUser = await User.findOne({$or: [{email}, {username}]});
    if(exstingUser) {
        throw new ApiError(401, "User already exists!")
    }

    const avatarPath = req.files?.avatar[0]?.path;
    const coverImagePath = req.files?.coverImage[0]?.path;

    if(!avatarPath || !coverImagePath) {
        throw new ApiError(404, "Avatar or cover image missing!");
    }

    const avatar = await uploadOnCloudinary(avatarPath);
    const coverImage = await uploadOnCloudinary(coverImagePath);

    if(!avatar || !coverImage) {
        throw new ApiError(504, "An error occured while uploading the files to cloudinary");
    }

    const user = await User.create(
        {
            fullName,
            username,
            email,
            avatar: avatar.url,
            coverImage: coverImage?.url ,
            password,
        }
    )

    const createdUser = await User.findOne(user._id);

    if(!createdUser) {
        throw new ApiError(502, "Something went wrong while registering user to DB");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )
})


export {registerUser}