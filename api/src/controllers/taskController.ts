import { Request, Response } from "express";
import CreateTaskRequestDTO from "../dtos/CreateTaskRequestDTO";
import dtoValidator from "../utils/dtoValidator";
import TaskRepository from "../repositories/taskRepository";
import UpdateTaskRequestDTO from "../dtos/UpdateTaskRequestDTO";
import UpdateTaskListRequestDTO from "../dtos/UpdateTaskListRequestDTO";

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

      return res.status(404).send({ message: "Tarefa não encontrada." });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao atualizar a tarefa.", error });
    }
  }

  static async updateTaskList(req: Request, res: Response) {
    try {
      const body: UpdateTaskListRequestDTO = req.body;

      if (!dtoValidator(body, ["taskList"])) {
        console.log("teste 1")
        return res
          .status(400)
          .send({ message: "Erro no corpo da requisição." });
      }

      const taskList = body.taskList;

      taskList.forEach(async (task) => {
        if (!dtoValidator(task, ["idTask", "todoId", "description", "done"])) {
          console.log("teste 2")

          return res
            .status(400)
            .send({ message: "Erro no corpo da requisição." });
        }

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
        taskList
      })
    } catch (error) {
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
