import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; //use for encrypting the passwords
import jwt from "jsonwebtoken"; 


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }, 
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        }, 
        avatar: {
            type: String, //cloudinary url
            required: true,
        }, 
        coverImage: {
            type: String, //cloudinary url
        }, 
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required..."],
        }, 
        refreshToken: {
            type: String,
        }
    }, 
    { timestamps: true },
)

//.pre() is a hook which is used to define some action to be done before some specific operation
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) 
        this.password = await bcrypt.hash(this.password, 10);
    next();
})

//.methods creates a new method to be used for the specific schema
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        //payload
        {
            _id: this._id, //will be automatically assigned my mongodb
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
       {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
       } 
    )
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        //payload
        {
            _id: this._id, //will be automatically assigned my mongodb
        },
        process.env.REFRESH_TOKEN_SECRET,
       {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
       } 
    )
};


export const User = mongoose.model("User", userSchema);