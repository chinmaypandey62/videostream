import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express(); 


//app.use() method is used for middlewares and configurations

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


//to limit the size of json data coming
app.use(express.json({limit: "16kb"}));

//to help express understand the json coming from url
app.use(express.urlencoded({extended: true, limit: "16kb"}));

//to make some files publically available (The public folder)
app.use(express.static("public"));

//to access and set (CRED operation) the browser's cookies from the server
app.use(cookieParser());

 
export default app;