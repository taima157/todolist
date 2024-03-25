import { Request, Response } from "express";
import CreateTaskRequestDTO from "../dtos/CreateTaskRequestDTO";
import dtoValidator from "../utils/dtoValidator";
import TaskRepository from "../repositories/taskRepository";
import UpdateTaskRequestDTO from "../dtos/UpdateTaskRequestDTO";

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

  static async updateTask(req: Request, res: Response) {
    try {
      const { id_task } = req.params;
      const body: UpdateTaskRequestDTO = req.body;

      if (!dtoValidator(body, ["description", "done", "todoId"])) {
        return res
          .status(400)
          .send({ message: "Erro no corpo da requisição." });
      }

      const task = await TaskRepository.findByPk(id_task);

      if (task) {
        task.set(body);

        await task.save();

        return res.status(200).send(task);
      }

      return res.status(404).send({ message: "Task não encontrado." });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao adicionar a tarefa.", error });
    }
  }
}
