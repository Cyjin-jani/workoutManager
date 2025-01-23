'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
        console.log('🚀 ~ handleAuth ~ result:', result);

        // TODO: 유저 존재 여부 확인 (with email)

        // TODO: 유저가 존재하지 않는 경우 유저 생성 로직 추가

        // TODO: 세션/쿠키 설정하기 (로그인 처리)

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
