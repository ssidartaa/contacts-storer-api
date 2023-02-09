import { Express } from "express";

import clientsRoutes from "./clients.routes";
import contactsRoutes from "./contacts.routes";
import loginRoutes from "./login.routes";

export const appRoutes = (app: Express) => {
  app.use("/clients", clientsRoutes());
  app.use("/contacts", contactsRoutes());
  app.use("/login", loginRoutes());
};
