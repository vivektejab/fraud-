import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send( { success : false, errors: err.serializeErrors() });
  } else { 
    console.error(err); 
    res.status(400).send({
      success : false,
      errors: [{ message: 'Something went wrong' }],
    });
  }
};
