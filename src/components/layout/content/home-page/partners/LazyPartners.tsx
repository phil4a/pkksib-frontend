"use client";

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

const PartnersDynamic = dynamic(
  () => import('./Partners').then(m => m.Partners),
  {
    ssr: false,
    loading: () => (
      <section className='mb-16 lg:mb-25'>
        <div className='layout-container'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5'>
            <SkeletonLoader count={4} className='rounded-xl h-[120px]' />
          </div>
        </div>
      </section>
    )
  }
);

export function LazyPartners() {
  return <PartnersDynamic />;
}

