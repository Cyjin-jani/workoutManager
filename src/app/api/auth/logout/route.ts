import { AUTH_ACCESS_TOKEN } from '@/app/constants/auth';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  const response = NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
  response.cookies.delete(AUTH_ACCESS_TOKEN);

  return response;
}
