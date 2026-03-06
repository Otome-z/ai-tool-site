import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma.js';
import { HttpError } from '../utils/http-error.js';
import type { AuthUserDto } from '../types/auth.js';

function toUserDto(user: { id: number; email: string; createdAt: Date }): AuthUserDto {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString()
  };
}

export async function registerUser(email: string, password: string): Promise<AuthUserDto> {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    throw new HttpError(409, 'email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash
    }
  });

  return toUserDto(user);
}

export async function loginUser(email: string, password: string): Promise<AuthUserDto> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new HttpError(401, 'invalid email or password');
  }

  const passwordOk = await bcrypt.compare(password, user.passwordHash);
  if (!passwordOk) {
    throw new HttpError(401, 'invalid email or password');
  }

  return toUserDto(user);
}

export async function getUserById(id: number): Promise<AuthUserDto> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new HttpError(404, 'user not found');
  }

  return toUserDto(user);
}
