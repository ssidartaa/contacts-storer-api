import { Router } from "express";

import {
  createContactController,
  listOwnerContactsController,
  updateContactController,
  deleteContactController,
} from "../controllers/contacts.controllers";

import {
  ensureAuthClient,
  ensureOwnerContactExists,
  ensureBodyMiddleware,
} from "../middlewares";

import {
  createContactSerializer,
  updateContactSerializer,
} from "../serializers/contacts.serializers";

const router = Router();

const contactsRoutes = () => {
  router.post(
    "",
    ensureAuthClient,
    ensureBodyMiddleware(createContactSerializer),
    createContactController
  );
  router.get("", ensureAuthClient, listOwnerContactsController);
  router.patch(
    "/:id",
    ensureAuthClient,
    ensureOwnerContactExists,
    ensureBodyMiddleware(updateContactSerializer),
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
