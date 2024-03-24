import express from "express";
import TaskController from "../controllers/taskController";

const taskRouter = express.Router();

taskRouter.post("/", TaskController.createTask);

export default taskRouter;
