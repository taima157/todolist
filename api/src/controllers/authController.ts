import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";
import { InferType, ValidationError } from "yup";
import LoginSchema from "../schemas/LoginSchema";

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: InferType<typeof LoginSchema> = req.body;
      await LoginSchema.validate(body);

      const user = await UserRepository.findByEmail(body.email);

      if (user) {
        const match = await bycript.compare(body.password, user.password);

        if (match) {
          const token = jwt.sign(
            { email: user.email, idUser: user.idUser },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
          );

          return res.status(200).send({ token });
        }

        return res.status(404).send({ message: "E-mail ou senha inválidas." });
      }

      return res.status(404).send({ message: "E-mail ou senha inválidas." });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).send({ message: error.message });
      }

      return res.status(500).send({ message: "Erro ao se autenticar.", error });
    }
  }

  static async middleware(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      jwt.verify(token!, process.env.JWT_SECRET!);

      return next();
    } catch (error) {
      return res.status(401).send({ message: "Não autorizado" });
    }
  }
}
