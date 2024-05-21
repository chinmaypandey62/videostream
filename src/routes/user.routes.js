import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

//if http://localhost:8000/api/v1/users/register is hit then it transfers the control to registerUser.
router.route("/register").post(
    //multer middleware used to upload avatar and coverImage files
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser)

export default router;