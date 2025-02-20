import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    JWT_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_REDIRECT_URI: z.string().url(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});
