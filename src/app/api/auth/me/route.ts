import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_ACCESS_TOKEN } from '@/app/constants/auth';
import { verifyAccessToken } from '@/app/lib/auth';
import { get } from '@/app/lib/cf';

export const runtime = 'edge';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    const { db } = await get();
    const user = await db.user.findUnique({
      where: {
        id: payload.userId,
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
