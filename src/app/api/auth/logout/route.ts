import { AUTH_ACCESS_TOKEN_KEY } from '@/app/constants/auth';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.delete(AUTH_ACCESS_TOKEN_KEY);

  return response;
}
