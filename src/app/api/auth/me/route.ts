import { AUTH_ACCESS_TOKEN } from '@/app/constants/auth';
import { getAuthMe } from '@/app/lib/auth';

import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.json(null);
  }

  const user = await getAuthMe(accessToken);
  return NextResponse.json(user);
}
