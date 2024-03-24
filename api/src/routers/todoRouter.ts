import express from "express";
import TodoController from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/:id_todo", TodoController.getTodo);
todoRouter.delete("/:id_todo", TodoController.deleteTodo);
todoRouter.post("/", TodoController.createTodo);

export default todoRouter;
