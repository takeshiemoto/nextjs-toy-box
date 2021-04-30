import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useJwt } from '../auth';

export function Index() {
  const router = useRouter();
  const { token } = useJwt();
  useEffect(() => {
    if (!token) {
      router.push('/signin');
    }
  }, [router, token]);
  return <div>Hi</div>;
}
export default Index;
