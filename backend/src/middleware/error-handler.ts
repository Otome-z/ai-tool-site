import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../utils/http-error.js';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      code: error.statusCode,
      message: error.message
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      code: 400,
      message: 'invalid params'
    });
    return;
  }

  console.error(error);
  res.status(500).json({
    code: 500,
    message: 'internal server error'
  });
}
