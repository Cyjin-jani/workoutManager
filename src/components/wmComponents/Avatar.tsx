import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type { User } from '@prisma/client';

interface MyAvatarProps extends Pick<User, 'profileUrl'> {
  displayName: User['name'];
}

export function MyAvatar({ profileUrl, displayName }: MyAvatarProps) {
  return (
    <Avatar className="size-8">
      {profileUrl && <AvatarImage src={profileUrl} alt="profile avatar" className="size-8" />}
      <AvatarFallback>{displayName?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
