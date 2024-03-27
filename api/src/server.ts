import dotenv from "dotenv";
dotenv.config();

import cluster from "cluster";
import os from "os";

import http from "http";
import app from "./app";

const server = http.createServer(app);
const DOCKER_PORT = Number(process.env.NODE_DOCKER_PORT || 8080);

const numCPUs = os.cpus().length / 2;

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  server.listen(DOCKER_PORT, () => {
    console.log(
      "Running internal: ",
      DOCKER_PORT,
      ", Running external: ",
      process.env.NODE_LOCAL_PORT
    );
  });
}
