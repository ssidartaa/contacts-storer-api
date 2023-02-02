import { Router } from "express";

import {
  createClientController,
  DeleteClientController,
  listClientsController,
  updateClientController,
} from "../controllers/clients.controllers";

import { ensureClientExists } from "../middlewares";

const clientsRoutes = (router: Router) => {
  router.post("", createClientController);
  router.post("", listClientsController);
  router.post("/:id", ensureClientExists, updateClientController);
  router.post("/:id", ensureClientExists, DeleteClientController);

  return router;
};

export default clientsRoutes;
