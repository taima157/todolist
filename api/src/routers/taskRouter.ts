import express from "express";
import TaskController from "../controllers/taskController";

const taskRouter = express.Router();

taskRouter.post("/", TaskController.createTask);
taskRouter.put("/:id_task", TaskController.updateTask);

export default taskRouter;
