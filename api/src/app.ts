import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routers/userRouter";
import todoRouter from "./routers/todoRouter";
import taskRouter from "./routers/taskRouter";
import authRouter from "./routers/authRouter";
import AuthController from "./controllers/authController";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/user/", AuthController.middleware, userRouter);
app.use("/todo/", AuthController.middleware, todoRouter);
app.use("/task/", AuthController.middleware, taskRouter);
app.use("/auth/", authRouter);

app.get("/", (_, res) => {
  res.status(200).send({ message: "API Todo List" });
});

export default app;
