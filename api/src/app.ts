import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routers/userRouter";
import todoRouter from "./routers/todoRouter";
import taskRouter from "./routers/taskRouter";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/user/", userRouter);
app.use("/todo/", todoRouter);
app.use("/task/", taskRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "API Todo List" });
});

export default app;
