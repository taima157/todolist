import { QueryTypes } from "sequelize";
import User from "../models/user";
import database from "../database";

export default class UserRepository extends User {
  static async findByEmail(email: string) {
    const user = await database.query<User>(
      "SELECT * FROM `users` WHERE email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    return user[0] ? user[0] : null
  }
}
