import { fetchAuthMe } from '@/app/lib/fetchAuthMe';
import type { User } from '@prisma/client';
import { type UseSuspenseQueryResult, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

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
