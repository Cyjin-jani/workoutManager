import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MyAvatarProps {
  profileUrl: string | null;
  displayName: string | null;
}
export function MyAvatar({ profileUrl, displayName }: MyAvatarProps) {
  return (
    <Avatar className="h-[32px] w-[32px]">
      {profileUrl && (
        <AvatarImage src={profileUrl} alt="profile avatar" className="h-[32px] w-[32px]" />
      )}
      <AvatarFallback>{displayName?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
