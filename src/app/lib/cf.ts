import { getRequestContext } from '@cloudflare/next-on-pages';
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export async function get() {
  return {
    db: await getDB(),
  };
}

export async function getDB() {
  const adapter = new PrismaD1(getRequestContext().env.DB);
  return new PrismaClient({ adapter });
}
