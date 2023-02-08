import { RequestHandler } from "express";
import { AnySchema, ValidationError } from "yup";
import AppError from "../errors/appError";

const ensureBodyMiddleware =
  (schema: AnySchema): RequestHandler =>
  async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validatedBody;

      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const { errors }: { errors: any } = err;
        throw new AppError(errors, 400);
      }

      throw err;
    }
  };

export default ensureBodyMiddleware;
