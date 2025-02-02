import { cookies } from 'next/headers';
import Link from 'next/link';
import type { User } from '@prisma/client';

export default async function Home() {
  const user = await getAuthenticatedUser();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1>메인 페이지</h1>
        {user ? (
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

async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}
