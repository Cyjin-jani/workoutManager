import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function get() {
  return {
    db: await getDB(),
  };
}

export async function getDB() {
  const adapter = new PrismaD1(getRequestContext().env.DB);
  return new PrismaClient({ adapter });
}
