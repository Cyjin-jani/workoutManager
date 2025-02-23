import { useAuthMe } from '@/app/hooks/queries/useAuthMe';
import { useLogout } from '@/app/hooks/queries/useLogout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MyAvatar } from '@/components/wmComponents/Avatar';

export const GNBRightSection = () => {
  const { data: user } = useAuthMe();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MyAvatar profileUrl={user.profileUrl} displayName={user.name} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
