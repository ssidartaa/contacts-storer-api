import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";

const handleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return res
    .status(500)
    .json({ message: `Internal server Error: ${err.message}` });
};

export default handleErrorMiddleware;
