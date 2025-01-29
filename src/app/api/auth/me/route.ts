import { get } from '@/app/lib/cf';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/app/lib/auth';
import { AUTH_ACCESS_TOKEN } from '@/app/login/google/callback/page';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    const { db } = await get();
    const user = await db.user.findUnique({
      where: {
        id: payload.userId as number,
      },
    });

    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 401 });
  }
}
