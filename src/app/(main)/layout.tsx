import { GNB } from '@/components/wmComponents/GNB';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div className="h-100dvh px-4 pt-[60px] sm:px-6 md:px-8">{children}</div>
    </>
  );
}
