'use client';

import { GNBRightSection } from '@/components/wmComponents/GNBRightSection';
import Link from 'next/link';
import { Suspense } from 'react';

export function GNB() {
  return (
    <nav className="absolute top-0 z-50 flex h-[60px] w-full max-w-3xl items-center justify-between bg-slate-200 px-4 py-[12px] shadow-[0_0_15px_0_rgb(0,0,0,0.05)] backdrop-blur-sm sm:px-6 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-semibold">
          Workout Manager
        </Link>
      </div>
      <Suspense fallback={<div className="size-8 rounded-full bg-muted"></div>}>
        <GNBRightSection />
      </Suspense>
    </nav>
  );
}
