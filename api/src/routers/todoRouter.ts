import express from "express";
import TodoController from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.post("/", TodoController.createTodo);

export default todoRouter;
