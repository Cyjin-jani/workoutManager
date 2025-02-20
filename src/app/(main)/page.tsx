import { fetchAuthMe } from '@/app/lib/fetchAuthMe';
import { MyButton } from '@/components/wmComponents/Button';
import Link from 'next/link';

export default async function Home() {
  const user = await fetchAuthMe();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1>메인 페이지</h1>
        {user ? (
          <div>
            <p>로그인 된 유저의 화면입니다.</p>
          </div>
        ) : (
          <MyButton variant="outline" asChild>
            <Link href="/login">로그인하러 가기</Link>
          </MyButton>
        )}
      </main>
    </div>
  );
}
