import express from "express";
import AuthController from "../controllers/authController";
import UserController from "../controllers/userController";

const authRouter = express.Router();

authRouter.post("/login/", AuthController.login);
authRouter.post("/signup/", UserController.createUser);

export default authRouter;
