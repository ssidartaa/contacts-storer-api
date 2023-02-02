import { Express, Router } from "express";
import clientsRoutes from "./clients.routes";

const router = Router();

export const appRoutes = (app: Express) => {
  app.use("/clients", clientsRoutes(router));
};
