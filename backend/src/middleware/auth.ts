import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { HttpError } from '../utils/http-error.js';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.token as string | undefined;
  if (!token) {
    next(new HttpError(401, 'unauthorized'));
    return;
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    next(new HttpError(401, 'invalid token'));
  }
}
