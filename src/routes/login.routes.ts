import { Router } from "express";

import LoginController from "../controllers/login.controller";

const router = Router();

const loginRoutes = () => {
  router.post("", LoginController);

  return router;
};

export default loginRoutes;
