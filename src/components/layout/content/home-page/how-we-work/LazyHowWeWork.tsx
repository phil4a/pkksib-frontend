"use client";

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

const HowWeWorkDynamic = dynamic(
  () => import('./HowWeWork').then(m => m.HowWeWork),
  {
    ssr: false,
    loading: () => (
      <div className='mb-16 lg:mb-25'>
        <SkeletonLoader className='h-64 sm:h-80 md:h-90 w-full rounded-xl' />
      </div>
    )
  }
);

export function LazyHowWeWork() {
  return <HowWeWorkDynamic />;
}

