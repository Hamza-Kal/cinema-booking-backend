import { Request, Response } from 'express';
import Joi from 'joi';
import { RequestPropertyMiddlewareEnum } from './enums';

// Middleware function for Joi validation
export const validateReqProperty =
  (schema: Joi.ObjectSchema<any>, reqProperty: RequestPropertyMiddlewareEnum) =>
  (req: Request, res: Response, next: any) => {
    const { error, value } = schema.validate(req[reqProperty], {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }
    req[reqProperty] = value;
    next();
  };

export const objectIdSchema = Joi.string().hex().min(24).max(24).required();
export const joiSchemas = {
  paramsId: Joi.object({
    id: objectIdSchema,
  }),
};
