import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../exception/HttpException';


const globalErrorHandler: ErrorRequestHandler = (
  err: Error | HttpException, 
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const status = err instanceof HttpException ? err.status : 400;
  const message = err.message;

  console.error(`[ERROR] Status: ${status} - Message: ${err.message || err}`);

  res.status(status).send({
    message: message,
    timestamp: new Date(),
    path: req.url
  });
};

export default globalErrorHandler;