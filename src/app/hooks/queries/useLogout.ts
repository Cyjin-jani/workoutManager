import { useAuthMeOptions } from '@/app/hooks/queries/useAuthMe';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const logout = async (): Promise<void> => {
  await fetch('/api/auth/logout', { method: 'POST' });
};

export const useLogout = (
  options?: UseMutationOptions<void, AxiosError, void>
): UseMutationResult<void, AxiosError, void> => {
  const queryClient = useQueryClient();
  const authMeOptions = useAuthMeOptions();

  return useMutation<void, AxiosError, void>({
    mutationFn: logout,
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authMeOptions.queryKey });
    },
  });
};
