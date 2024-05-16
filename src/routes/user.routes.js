import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)
//if http://localhost:8000/api/v1/users/register is hit then it transfers the control to registerUser.

export default router;