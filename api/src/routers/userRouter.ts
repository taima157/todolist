import express from "express";
import UserController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id_user", UserController.getUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.post("/", UserController.createUser);

export default userRouter;
