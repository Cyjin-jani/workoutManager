import type { User } from '@prisma/client';
import { type UseSuspenseQueryResult, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const isServer = typeof window === 'undefined';
const BASE_URL = isServer ? process.env.API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAuthMe = async (): Promise<User> => {
  const headers = {
    ...(isServer ? { Cookie: (await (await import('next/headers')).cookies()).toString() } : {}),
  };

  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

const useAuthMeOptions = () => {
  return queryOptions<User>({
    queryKey: ['me'] as const,
    queryFn: fetchAuthMe,
  });
};

export const useAuthMe = (): UseSuspenseQueryResult<User> => {
  const options = useAuthMeOptions();
  return useSuspenseQuery(options);
};
