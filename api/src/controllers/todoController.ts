import { Request, Response } from "express";
import CreateTodoRequestDTO from "../dtos/CreateTodoRequestDTO";
import dtoValidator from "../utils/dtoValidator";
import TodoRepository from "../repositories/todoRepository";

export default class TodoController {
  static async createTodo(req: Request, res: Response) {
    try {
      const body: CreateTodoRequestDTO = req.body;

      if (!dtoValidator(body, ["userId", "title", "description"])) {
        return res
          .status(400)
          .send({ message: "Erro no corpo da requisição." });
      }

      const newTodo = await TodoRepository.create(body);

      return res.status(201).send(newTodo);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao adicionar o a fazer.", error });
    }
  }
}
