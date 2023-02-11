import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import express from "express";

import cors from "cors";

import { appRoutes } from "./routes";

import { handleErrorMiddleware } from "./middlewares";

const app = express();

app.use(cors());

app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
