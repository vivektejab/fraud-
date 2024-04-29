import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { RequestValidationError } from "../../common/src";
import log from '../utils/logger';

const validate =
(schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      //return res.status(400).send(e.errors);
      log.error(`Request validation Error : ${e.errors}`);
      return next(new RequestValidationError(e.errors));
    }
  };

export default validate;
