import { getAuthenticatedUser } from '@/app/lib/auth';
import { GNB } from '@/components/wmComponents/GNB';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();

  return (
    <>
      <GNB user={user} />
      <div className="h-100dvh px-4 pt-[60px] sm:px-6 md:px-8">{children}</div>
    </>
  );
}
