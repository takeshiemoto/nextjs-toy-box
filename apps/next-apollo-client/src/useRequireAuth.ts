import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useJwt } from './auth';

export const useRequireAuth = () => {
  const router = useRouter();
  const { jwt, loading } = useJwt();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!jwt) {
      router.push('/signin');
    }
  }, [jwt, loading, router]);
};
