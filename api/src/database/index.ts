import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const database = new Sequelize(dbName!, dbUsername!, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default database;
