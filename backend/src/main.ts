import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { LoggerService } from "@infra/logger/logger.service";

import bodyParser from "body-parser";

import express from "express";

import { authorRouter } from "./presenters/routes/author.routes";

import "@infra/container/container-inject";

const logger = new LoggerService();

const app = express();
app.use(bodyParser.json());
const PORT = Number(process.env.SERVER_PORT) || 3000;

app.use(authorRouter);

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
