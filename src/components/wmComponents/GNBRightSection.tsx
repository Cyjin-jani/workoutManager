import { useAuthMe } from '@/app/hooks/queries/useAuthMe';
import { useLogout } from '@/app/hooks/useLogout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MyAvatar } from '@/components/wmComponents/Avatar';
import { MyButton } from '@/components/wmComponents/Button';
import Link from 'next/link';

export const GNBRightSection = () => {
  const { data: user } = useAuthMe();
  const { logout } = useLogout();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MyAvatar profileUrl={user.profileUrl} displayName={user.name} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
