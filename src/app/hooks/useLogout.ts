import { useAuthMeOptions } from '@/app/hooks/queries/useAuthMe';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const options = useAuthMeOptions();

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('로그아웃 실패');
      }

      await queryClient.invalidateQueries({ queryKey: options.queryKey });
      router.replace('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      throw error;
    }
  };

  return { logout };
}
