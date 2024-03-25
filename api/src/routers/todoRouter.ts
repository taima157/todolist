import express from "express";
import TodoController from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/:id_todo", TodoController.getTodo);
todoRouter.post("/", TodoController.createTodo);
todoRouter.put("/:id_todo", TodoController.updateTodo);
todoRouter.delete("/:id_todo", TodoController.deleteTodo);

export default todoRouter;
