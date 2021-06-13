import { Request, Response, NextFunction, RequestHandler } from 'express-serve-static-core';

function asyncWrapper(fn: Function, context?: any): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      return (await context) ? fn.apply(context, [req, res, next]) : fn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

export default asyncWrapper;
