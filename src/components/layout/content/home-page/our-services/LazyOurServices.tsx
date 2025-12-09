"use client";

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

const OurServicesDynamic = dynamic(
  () => import('./OurServices').then(m => m.OurServices),
  {
    ssr: false,
    loading: () => (
      <section className='mb-16 lg:mb-25'>
        <div className='layout-container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5'>
            <SkeletonLoader count={4} className='rounded-xl h-[240px]' />
          </div>
        </div>
      </section>
    )
  }
);

export function LazyOurServices() {
  return <OurServicesDynamic />;
}

