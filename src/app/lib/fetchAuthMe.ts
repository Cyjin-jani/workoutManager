import { env } from '@/env';
import type { User } from '@prisma/client';
import { isServer } from '@tanstack/react-query';

export const fetchAuthMe = async (): Promise<User> => {
  try {
    const headers = {
      ...(isServer ? { Cookie: (await (await import('next/headers')).cookies()).toString() } : {}),
    };

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch auth data:', error);
    throw error;
  }
};
