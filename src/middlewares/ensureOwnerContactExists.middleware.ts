import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";

import { contactRepository } from "../utils/getRepositories.utils";

const ensureOwnerContactExists = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const contact = await contactRepository.findOne({
    where: {
      id,
    },
    relations: { client: true },
  });

  if (!contact) throw new AppError("Contact not found", 404);

  if (contact.client.id !== req.client.id)
    throw new AppError("Missing Owner permissions", 401);

  return next();
};

export default ensureOwnerContactExists;
