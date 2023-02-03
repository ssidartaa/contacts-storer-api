import { Router } from "express";

import {
  createContactController,
  listOwnerContactsController,
  updateContactController,
  deleteContactController,
} from "../controllers/contacts.controllers";

import { ensureAuthClient, ensureOwnerContactExists } from "../middlewares";

const router = Router();

const contactsRoutes = () => {
  router.post("", ensureAuthClient, createContactController);
  router.get("", ensureAuthClient, listOwnerContactsController);
  router.patch(
    "/:id",
    ensureAuthClient,
    ensureOwnerContactExists,
    updateContactController
  );
  router.delete(
    "/:id",
    ensureAuthClient,
    ensureOwnerContactExists,
    deleteContactController
  );

  return router;
};

export default contactsRoutes;
