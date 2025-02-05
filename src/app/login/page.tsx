import { getGoogleOAuthURL } from '@/app/login/lib/getGoogleOAuthURL';
import Image from 'next/image';

export default function Login() {
  const href = getGoogleOAuthURL();

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12 rounded-xl border border-gray-200 px-12 py-6 shadow-md">
        <h1 className="text-xl font-bold">로그인</h1>
        <a
          href={href}
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-md border border-gray-300 px-6 py-2 shadow-sm"
        >
          <Image src="./images/ic-btn-google-login.svg" alt="google icon" width={16} height={16} />
          Google로 계속하기
        </a>
      </div>
    </div>
  );
}
