import { Request, Response } from "express";
import CreateTaskRequestDTO from "../dtos/CreateTaskRequestDTO";
import dtoValidator from "../utils/dtoValidator";
import TaskRepository from "../repositories/taskRepository";

export default class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const body: CreateTaskRequestDTO = req.body;

      if (!dtoValidator(body, ["todoId", "description"])) {
        return res
          .status(400)
          .send({ message: "Erro no corpo da requisição." });
      }

      const newTask = await TaskRepository.create(body);

      return res.status(201).send(newTask);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao adicionar a tarefa.", error });
    }
  }
}
