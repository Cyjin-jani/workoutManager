'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
        await axios.post('/api/auth/login', {
          token: access_token,
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
