import { AUTH_ACCESS_TOKEN_KEY } from '@/app/constants/auth';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_ACCESS_TOKEN_KEY);

  const response = NextResponse.redirect(new URL('/', request.url));
  return response;
}
