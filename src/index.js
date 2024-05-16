// require('dotenv').config({path: './env'})
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
});

//this function call will connect the DB to the server
connectDB()
//if connected then
.then(() => {
    app.on("error", (error) => {
        console.error("Error :", error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started at port: ${process.env.PORT}`);
    })
})
//else throw an error
.catch((err) => {
    console.error(`Database connection error: ${err}`);
})