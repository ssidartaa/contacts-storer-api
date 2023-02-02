import { Router } from "express";

import LoginController from "../controllers/login.controller";

const loginRoutes = (router: Router) => {
  router.post("", LoginController);

  return router;
};

export default loginRoutes;
