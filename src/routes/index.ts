import { Express, Router } from "express";

import clientsRoutes from "./clients.routes";
import loginRoutes from "./login.routes";

const router = Router();

export const appRoutes = (app: Express) => {
  app.use("/clients", clientsRoutes(router));
  app.use("/login", loginRoutes(router));
};
