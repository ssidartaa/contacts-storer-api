import { Router } from "express";

import {
  createClientController,
  listClientsController,
  retrieveClientController,
  retrievePDFClientController,
  updateClientController,
  deleteClientController,
} from "../controllers/clients.controllers";

import { ensureAuthClient } from "../middlewares";

const router = Router();

const clientsRoutes = () => {
  router.post("", createClientController);
  router.get("", listClientsController);
  router.get("/owner", ensureAuthClient, retrieveClientController);
  router.post("/pdf", ensureAuthClient, retrievePDFClientController);
  router.patch("", ensureAuthClient, updateClientController);
  router.delete("", ensureAuthClient, deleteClientController);

  return router;
};

export default clientsRoutes;
