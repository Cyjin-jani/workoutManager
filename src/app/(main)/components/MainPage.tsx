'use client';

import { MainContent } from '@/app/(main)/components/MainContent';
import { MyButton } from '@/components/wmComponents/Button';
import ErrorBoundaryWithSuspense from '@/components/wmComponents/ErrorBoundary/ErrorBoundaryWithSuspense';
import Link from 'next/link';

export function MainPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1>메인 페이지</h1>
        <ErrorBoundaryWithSuspense
          errorFallback={
            <MyButton variant="outline" asChild>
              <Link href="/login">로그인하러 가기</Link>
            </MyButton>
          }
          loadingFallback={<div className="flex h-full flex-col justify-center">loading...</div>}
        >
          <MainContent />
        </ErrorBoundaryWithSuspense>
      </main>
    </div>
  );
}
