import { getDB } from '@/app/lib/cf';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // const { db } = await get();
  const db = await getDB();
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
