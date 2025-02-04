import { get } from '@/app/lib/cf';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { db } = await get();
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
