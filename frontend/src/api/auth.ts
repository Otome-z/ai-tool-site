import client from './client';
import type { ApiResponse, AuthUser } from '../types/auth';

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const res = await client.post<ApiResponse<AuthUser>>('/api/auth/register', payload);
  return res.data.data;
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const res = await client.post<ApiResponse<AuthUser>>('/api/auth/login', payload);
  return res.data.data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await client.get<ApiResponse<AuthUser>>('/api/auth/me');
  return res.data.data;
}

export async function logout(): Promise<void> {
  await client.post('/api/auth/logout');
}
