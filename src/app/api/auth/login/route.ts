import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AUTH_ACCESS_TOKEN } from '@/app/constants/auth';
import { createAccessToken } from '@/app/lib/auth';

import type { User } from '@prisma/client';
import type { NextRequest } from 'next/server';

type RequestBody = {
  token: string;
};

type GoogleUserInfo = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export const runtime = 'edge';
const COOKIE_EXPIRE_IN_1_WEEK = 7;

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const body = await request.json();
  const { token } = body as RequestBody;

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  const googleUser = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then<GoogleUserInfo>((res) => res.json());

  const userResponse = await fetch(
    `${process.env.API_BASE_URL}/api/auth/verify-user?${new URLSearchParams({ email: googleUser.email })}`
  );
  const user = (await userResponse.json()) as User;

  if (!user) {
    const createUserResponse = await fetch(`${process.env.API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: googleUser.email,
        name: googleUser.name,
        profileUrl: googleUser.picture,
      }),
    });
    const newUser = (await createUserResponse.json()) as User;
    const accessToken = await createAccessToken(newUser.id);
    const response = NextResponse.json({ message: '로그인 성공' }, { status: 200 });

    cookieStore.set(AUTH_ACCESS_TOKEN, accessToken, {
      path: '/',
      httpOnly: true,
      maxAge: COOKIE_EXPIRE_IN_1_WEEK * 24 * 60 * 60,
    });

    return response;
  }

  const accessToken = await createAccessToken(user.id);
  const response = NextResponse.json({ message: '로그인 성공' }, { status: 200 });

  cookieStore.set(AUTH_ACCESS_TOKEN, accessToken, {
    path: '/',
    httpOnly: true,
    maxAge: COOKIE_EXPIRE_IN_1_WEEK * 24 * 60 * 60,
  });

  return response;
}
