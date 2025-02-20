import { env } from '@/env';

export const getGoogleOAuthURL = () => {
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${env.NEXT_PUBLIC_REDIRECT_URI}/login/google/callback`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'token',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};
