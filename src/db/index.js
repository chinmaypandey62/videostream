import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//used async function because the DB might take some time to respond
const connectDB = async () => {
    //used try-catch because the connection might get some error
    try {
        //we need to provide the path for connection of DB which is (MONGODB_URI/DB_NAME)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected. DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("An error occured while connecting to the database:", error);
        process.exit(1);
    }
}

//exported the function to get available to be used for connecting the database
export default connectDB;