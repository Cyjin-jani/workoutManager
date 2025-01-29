import Link from 'next/link';
import type { User } from '@prisma/client';
import { cookies } from 'next/headers';

export default async function Home() {
  const user = await getAuthenticatedUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
