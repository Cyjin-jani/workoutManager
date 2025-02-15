import { env } from '@/env';
import type { User } from '@prisma/client';
import { isServer } from '@tanstack/react-query';

export const fetchAuthMe = async (): Promise<User> => {
  const headers = {
    ...(isServer ? { Cookie: (await (await import('next/headers')).cookies()).toString() } : {}),
  };
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return response.json();
};
