import { AUTH_ACCESS_TOKEN_KEY } from '@/app/constants/auth';
import { getAuthMe } from '@/app/lib/auth';

import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_ACCESS_TOKEN_KEY)?.value;
  if (!accessToken) {
    return NextResponse.json(null);
  }

  const user = await getAuthMe(accessToken);
  return NextResponse.json(user);
}
