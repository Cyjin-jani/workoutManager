import type { User } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';
import type { JWTPayload } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
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

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}
