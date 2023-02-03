import { Router } from "express";

import {
  createClientController,
  deleteClientController,
  listClientsController,
  retrieveClientController,
  updateClientController,
} from "../controllers/clients.controllers";

import { ensureAuthClient } from "../middlewares";

const router = Router();

const clientsRoutes = () => {
  router.post("", createClientController);
  router.get("", listClientsController);
  router.get("/owner", ensureAuthClient, retrieveClientController);
  router.patch("", ensureAuthClient, updateClientController);
  router.delete("", ensureAuthClient, deleteClientController);

  return router;
};

export default clientsRoutes;
