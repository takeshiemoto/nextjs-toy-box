import dynamic from 'next/dynamic';
import React from 'react';

/**
 * @see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
 */
const DynamicComponent = dynamic(
  () => import('../components/Countries').then((mod) => mod.Countries),
  { ssr: false }
);

export function Index() {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
}

export default Index;
