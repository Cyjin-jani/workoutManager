import { cookies } from 'next/headers';
import Link from 'next/link';
import { AUTH_ACCESS_TOKEN } from './login/constants';

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get(AUTH_ACCESS_TOKEN);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>메인 페이지</h1>
        {isLoggedIn ? (
          <div>
            <p>로그인 된 유저의 화면입니다.</p>
          </div>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline">
            로그인하러 가기
          </Link>
        )}
      </main>
    </div>
  );
}
