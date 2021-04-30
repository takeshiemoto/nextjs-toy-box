import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useJwt } from '../auth';
import { useMessageQuery } from '../graphql/generated';

export function Index() {
  const router = useRouter();
  const { jwt } = useJwt();
  useEffect(() => {
    if (!jwt) {
      router.push('/signin');
    }
  }, [router, jwt]);

  const { data, loading, error } = useMessageQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Page</div>;
  }

  return <div>{data.message}</div>;
}
export default Index;
