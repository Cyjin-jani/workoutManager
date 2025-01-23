'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AUTH_ACCESS_TOKEN, COOKIE_EXPIRE_IN_1_WEEK } from '../../constants';

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

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const hash = location.hash.slice(1);
      const searchParams = new URLSearchParams(hash);
      const access_token = searchParams.get('access_token');

      if (!access_token) {
        console.error('No access token found');
        router.push('/login');
        return;
      }

      try {
        const { data: result } = await axios.get<GoogleUserInfo>(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );
        const userEmail = result.email;
        const { data: user } = await axios.get(`/api/auth/verify-user`, {
          params: {
            email: userEmail,
          },
        });

        if (!user) {
          await axios.post('/api/users', {
            email: userEmail,
            name: result.name,
            profileUrl: result.picture,
          });
        }

        // TODO: 추후 세션 설정, refresh token 등 처리하기 (일단 단순 로그인 처리)
        Cookies.set(AUTH_ACCESS_TOKEN, access_token, { expires: COOKIE_EXPIRE_IN_1_WEEK });
        router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
        router.push('/login');
      }
    };

    handleAuth();
  }, [router]);

  return <></>;
}
