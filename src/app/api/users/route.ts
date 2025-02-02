import { NextResponse } from 'next/server';
import { get } from '@/app/lib/cf';

export const runtime = 'edge';

export async function GET() {
  const { db } = await get();
  const users = await db.user.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: Request) {
  const { db } = await get();
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
}

type CreateUserBody = {
  email: string;
  name: string;
  profileUrl: string;
};
