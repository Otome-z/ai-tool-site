import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { getUserById, loginUser, registerUser } from '../services/auth.service.js';
import { success } from '../utils/response.js';
import { signToken } from '../utils/jwt.js';
import { HttpError } from '../utils/http-error.js';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function setAuthCookie(res: Response, token: string) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = authSchema.parse(req.body);
    const user = await registerUser(email, password);
    setAuthCookie(res, signToken({ userId: user.id }));
    res.status(201).json(success(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = authSchema.parse(req.body);
    const user = await loginUser(email, password);
    setAuthCookie(res, signToken({ userId: user.id }));
    res.json(success(user));
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new HttpError(401, 'unauthorized');
    }
    const user = await getUserById(userId);
    res.json(success(user));
  } catch (error) {
    next(error);
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('token');
  res.json(success({}));
}
