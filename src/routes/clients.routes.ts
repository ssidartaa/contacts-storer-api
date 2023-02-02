import { Router } from "express";

import {
  createClientController,
  DeleteClientController,
  listClientsController,
  updateClientController,
} from "../controllers/clients.controllers";

import {
  ensureAuthClient,
  ensureClientExists,
  ensureOwnerClient,
} from "../middlewares";

const clientsRoutes = (router: Router) => {
  router.post("", createClientController);
  router.get("", listClientsController);
  router.patch(
    "/:id",
    ensureAuthClient,
    ensureOwnerClient,
    ensureClientExists,
    updateClientController
  );
  router.delete(
    "/:id",
    ensureAuthClient,
    ensureOwnerClient,
    ensureClientExists,
    DeleteClientController
  );

  return router;
};

export default clientsRoutes;
