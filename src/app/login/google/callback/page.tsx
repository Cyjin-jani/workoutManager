'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const AUTH_ACCESS_TOKEN = 'access_token';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const hash = location.hash.slice(1);
      const searchParams = new URLSearchParams(hash);
      const accessToken = searchParams.get(AUTH_ACCESS_TOKEN);

      if (!accessToken) {
        console.error('No access token found');
        router.push('/login');
        return;
      }

      try {
        await axios.post('/api/auth/login', {
          token: accessToken,
        });
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
