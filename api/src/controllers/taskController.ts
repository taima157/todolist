import { Request, Response } from "express";
import TaskRepository from "../repositories/taskRepository";
import { InferType, ValidationError } from "yup";
import CreateTaskSchema from "../schemas/CreateTaskSchema";
import UpdateTaskSchema from "../schemas/UpdateTaskSchema";
import UpdateTaskListSchema from "../schemas/UpdateTaskListSchema";

export default class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const body: InferType<typeof CreateTaskSchema> = req.body;
      await CreateTaskSchema.validate(body);

      const newTask = await TaskRepository.create(body);

      return res.status(201).send(newTask);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).send({ message: error.message });
      }

      return res
        .status(500)
        .send({ message: "Erro ao adicionar a tarefa.", error });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { id_task } = req.params;
      const body: InferType<typeof UpdateTaskSchema> = req.body;
      await UpdateTaskSchema.validate(body);

      const task = await TaskRepository.findByPk(id_task);

      if (task) {
        task.set(body);

        await task.save();

        return res.status(200).send(task);
      }

      return res.status(404).send({ message: "Tarefa não encontrada." });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).send({ message: error.message });
      }

      return res
        .status(500)
        .send({ message: "Erro ao atualizar a tarefa.", error });
    }
  }

  static async updateTaskList(req: Request, res: Response) {
    try {
      const body: InferType<typeof UpdateTaskListSchema> = req.body;
      await UpdateTaskListSchema.validate(body);

      const taskList = body.taskList;

      taskList.forEach(async (task) => {
        const dbTask = await TaskRepository.findByPk(task.idTask);

        if (!dbTask)
          res.status(404).send({
            message: "Alguma tarefa passada na lista não foi encontrada.",
          });
      });

      taskList.forEach(async (newTask) => {
        const task = await TaskRepository.findByPk(newTask.idTask);

        if (task) {
          task.set(newTask);
          await task.save();
        }
      });

      return res.status(200).send({
        message: "Lista de tarefas atualizada com sucesso.",
        taskList,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).send({ message: error.message });
      }

      return res
        .status(500)
        .send({ message: "Erro ao atualizar a tarefa.", error });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const { id_task } = req.params;

      const task = await TaskRepository.findByPk(id_task);

      if (task) {
        await task.destroy();

        return res
          .status(204)
          .send({ message: "Tarefa deletada com sucesso." });
      }

      return res.status(404).send({ message: "Tarefa não encontrada." });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao deletar a tarefa.", error });
    }
  }
}
