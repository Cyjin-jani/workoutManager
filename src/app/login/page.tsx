import { getGoogleOAuthURL } from '@/app/login/lib/getGoogleOAuthURL';
import Image from 'next/image';

export default function Login() {
  const href = getGoogleOAuthURL();

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12 border border-gray-200 shadow-md rounded-xl py-6 px-12">
        <h1 className="font-bold text-xl">로그인</h1>
        <a
          href={href}
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-gray-300 rounded-md py-2 px-6 shadow-sm"
        >
          <Image src="./images/ic-btn-google-login.svg" alt="google icon" width={16} height={16} />
          Google로 계속하기
        </a>
      </div>
    </div>
  );
}
