import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const ISSUER = 'workout-manager';
const AUDIENCE = 'workout-manager-users';

export async function createAccessToken(userId: number) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime('1w')
    .sign(JWT_SECRET);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  return payload;
}
