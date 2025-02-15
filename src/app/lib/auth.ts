'use server';

import { get } from '@/app/lib/cf';
import { env } from '@/env';
import type { User } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';
import type { JWTPayload } from 'jose';

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET_KEY);
const ISSUER = 'workout-manager';
const AUDIENCE = 'workout-manager-users';

interface UserAuthPayload extends JWTPayload {
  userId: User['id'];
}

export async function createAccessToken(userId: User['id']) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime('1w')
    .sign(JWT_SECRET);
}

export async function verifyAccessToken(token: string): Promise<UserAuthPayload> {
  const { payload } = await jwtVerify<UserAuthPayload>(token, JWT_SECRET, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  return payload;
}

export const getAuthMe = async (accessToken: string) => {
  const payload = await verifyAccessToken(accessToken);
  const { db } = await get();
  const user = await db.user.findUnique({
    where: {
      id: payload.userId,
    },
  });
  return user;
};
