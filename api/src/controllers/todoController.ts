import { Request, Response } from "express";
import CreateTodoRequestDTO from "../dtos/CreateTodoRequestDTO";
import dtoValidator from "../utils/dtoValidator";
import TodoRepository from "../repositories/todoRepository";

export default class TodoController {
  static async getTodo(req: Request, res: Response) {
    try {
      const { id_todo } = req.params;

      const todo = await TodoRepository.findByPk(id_todo);

      if (todo) {
        const tasks = await todo.getTasks();

        return res.status(200).send({ ...todo.dataValues, tasks });
      }

      return res.status(404).send({ message: "Afazer não encontrado." });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao buscar o afazer.", error });
    }
  }

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
        .send({ message: "Erro ao adicionar o afazer.", error });
    }
  }

  static async deleteTodo(req: Request, res: Response) {
    try {
      const { id_todo } = req.params;

      const todo = await TodoRepository.findByPk(id_todo);

      if (todo) {
        const tasks = await todo.getTasks();

        tasks.forEach(async (task) => {
          await task.destroy();
        });

        await todo.destroy();

        return res
          .status(204)
          .send({ message: "Afazer deletado com sucesso." });
      }

      return res.status(404).send({ message: "Afazer não encontrado." });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao deletar o afazer.", error });
    }
  }
}
