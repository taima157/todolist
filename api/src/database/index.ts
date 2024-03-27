import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const database = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_DOCKER_PORT),
    dialect: "mysql",
  }
);

export default database;
