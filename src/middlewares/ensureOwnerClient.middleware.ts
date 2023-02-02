import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";

const ensureOwnerClient = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { id } = req.client;

  if (id !== req.params.id)
    throw new AppError("Missing Owner permissions", 401);

  return next();
};

export default ensureOwnerClient;
