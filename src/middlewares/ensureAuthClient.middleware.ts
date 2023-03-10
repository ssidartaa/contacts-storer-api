import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import AppError from "../errors/appError";

const ensureAuthClient = (req: Request, _: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(
    String(token),
    String(process.env.SECRET_KEY),
    (err: any, decoded: any) => {
      if (err || !decoded) throw new AppError("Invalid Token", 401);

      req.client = { id: decoded.sub };

      return next();
    }
  );
};

export default ensureAuthClient;
