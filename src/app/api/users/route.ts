import { get } from '@/app/lib/cf';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const { db } = await get();
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { db } = await get();
  try {
    const body = await request.json<CreateUserBody>();
    const { email, name, profileUrl } = body;

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다' }, { status: 400 });
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        profileUrl,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: '유저 생성에 실패했습니다' }, { status: 500 });
  }
}

type CreateUserBody = {
  email: string;
  name: string;
  profileUrl: string;
};
