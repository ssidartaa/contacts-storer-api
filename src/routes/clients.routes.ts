import { Request, Router } from "express";

import {
  createClientController,
  listClientsController,
  retrieveClientController,
  retrievePDFClientController,
  updateClientController,
  deleteClientController,
} from "../controllers/clients.controllers";

import { ensureAuthClient, ensureBodyMiddleware } from "../middlewares";

import {
  createClientSerializer,
  updateClientSerializer,
} from "../serializers/clients.serializers";

const router = Router();

const clientsRoutes = () => {
  router.post(
    "",
    ensureBodyMiddleware(createClientSerializer),
    createClientController
  );
  router.get("", listClientsController);
  router.get("/owner", ensureAuthClient, retrieveClientController);
  router.post("/pdf", ensureAuthClient, retrievePDFClientController);
  router.patch(
    "",
    ensureBodyMiddleware(updateClientSerializer),
    ensureAuthClient,
    updateClientController
  );
  router.delete("", ensureAuthClient, deleteClientController);

  return router;
};

export default clientsRoutes;
