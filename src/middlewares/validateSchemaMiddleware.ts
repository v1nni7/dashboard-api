import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

function validateSchemaMiddleware(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    next();
  };
}

export default validateSchemaMiddleware;
