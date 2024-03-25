import express from "express";
import TaskController from "../controllers/taskController";

const taskRouter = express.Router();

taskRouter.post("/", TaskController.createTask);
taskRouter.put("/list", TaskController.updateTaskList);
taskRouter.put("/:id_task", TaskController.updateTask);
taskRouter.delete("/:id_task", TaskController.deleteTask);

export default taskRouter;
