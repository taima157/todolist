import { Request, Response } from "express";
import TodoRepository from "../repositories/todoRepository";
import CreateTodoSchema from "../schemas/CreateTodoSchema";
import { InferType, ValidationError } from "yup";
import UpdateTodoSchema from "../schemas/UpdateTodoSchema";

export default class TodoController {
  static async getTodo(req: Request, res: Response) {
    try {
      const { id_todo } = req.params;

      const todo = await TodoRepository.findByPk(id_todo);

      if (todo) {
        const taskList = await todo.getTasks();

        return res.status(200).send({ ...todo.dataValues, taskList });
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
      const body: InferType<typeof CreateTodoSchema> = req.body;
      await CreateTodoSchema.validate(body);

      const newTodo = await TodoRepository.create(body);

      return res.status(201).send(newTodo);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).send({ message: error.message });
      }

      return res
        .status(500)
        .send({ message: "Erro ao adicionar o afazer.", error });
    }
  }

  static async updateTodo(req: Request, res: Response) {
    try {
      const { id_todo } = req.params;
      const body: InferType<typeof UpdateTodoSchema> = req.body;
      await UpdateTodoSchema.validate(body);

      const todo = await TodoRepository.findByPk(id_todo);

      if (todo) {
        todo.set(body);

        await todo.save();

        return res.status(200).send(todo);
      }

      return res.status(404).send({ message: "Afazer não encontrado." });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).send({ message: error.message });
      }

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
