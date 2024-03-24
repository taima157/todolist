import { Request, Response } from "express";
import dtoValidator from "../utils/dtoValidator";
import CreateUserRequestDTO from "../dtos/CreateUserRequestDTO";
import bycript from "bcrypt";
import UserRepository from "../repositories/userRepository";

export default class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const userList = await UserRepository.findAll();

      return res.status(200).send(userList);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { id_user } = req.params;
      const user = await UserRepository.findByPk(id_user);

      if (user) {
        const todos = await user.getTodos();

        return res.status(200).send({ ...user.dataValues, todos });
      }

      return res.status(404).send({ message: "Usuário não encontrado." });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const body: CreateUserRequestDTO = req.body;

      if (!dtoValidator(body, ["name", "email", "password"])) {
        return res
          .status(400)
          .send({ message: "Error no corpo da requisição." });
      }

      const user = await UserRepository.findByEmail(body.email);

      if (user.length != 0) {
        return res.status(400).send({ message: "Usuário já cadastrado." });
      }

      bycript.hash(body.password, 10, async (err, hash) => {
        if (err) throw err;

        body.password = hash;

        const newUser = await UserRepository.create(body);

        return res.status(201).send(newUser);
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Não foi possível criar usuário.", error });
    }
  }
}
