'use client';

import { useAuthMe } from '@/app/hooks/queries/useAuthMe';

export function MainContent() {
  const { data: user } = useAuthMe();

  return (
    <div>
      <p>로그인 된 유저 {user.name}의 화면입니다.</p>
    </div>
  );
}
