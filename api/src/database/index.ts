import dotenv from "dotenv";
dotenv.config({
  path: "../.env"
});

import { Sequelize } from "sequelize";

const database = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USERNAME!,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_DOCKER_PORT),
    dialect: "mysql",
  }
);

export default database;
