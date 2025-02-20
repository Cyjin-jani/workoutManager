import { useAuthMe } from '@/app/hooks/queries/useAuthMe';
import { MyAvatar } from '@/components/wmComponents/Avatar';
import { MyButton } from '@/components/wmComponents/Button';
import Link from 'next/link';

export const GNBRightSection = () => {
  const { data: user } = useAuthMe();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <MyAvatar profileUrl={user.profileUrl} displayName={user.name} />
      ) : (
        <MyButton asChild>
          <Link href="/login" className="text-sm">
            로그인
          </Link>
        </MyButton>
      )}
    </div>
  );
};
