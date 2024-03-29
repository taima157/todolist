import dotenv from "dotenv";
dotenv.config({
  path: "../.env"
});

import cluster from "cluster";
import os from "os";

import http from "http";
import app from "./app";

const server = http.createServer(app);
const API_DOCKER_PORT = Number(process.env.API_DOCKER_PORT || 8080);
const API_LOCAL_PORT = Number(process.env.API_LOCAL_PORT || 8080);

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
  server.listen(API_DOCKER_PORT, () => {
    console.log(
      "Running internal: ",
      API_DOCKER_PORT,
      ", Running external: ",
      API_LOCAL_PORT
    );
  });
}
