import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routers/userRouter";
import todoRouter from "./routers/todoRouter";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/user/", userRouter);
app.use("/todo/", todoRouter);

export default app;
