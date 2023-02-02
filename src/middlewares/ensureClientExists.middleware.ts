import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";

import { clientRepository } from "../utils/getRepositories.utils";

const ensureClientExists = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const Client = await clientRepository.findOneBy({ id });

  if (!Client) {
    throw new AppError("Client not found", 404);
  }

  return next();
};

export default ensureClientExists;
