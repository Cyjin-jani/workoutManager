import { AUTH_ACCESS_TOKEN_KEY } from '@/app/constants/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const runtime = 'edge';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_ACCESS_TOKEN_KEY);

  redirect('/');
}
