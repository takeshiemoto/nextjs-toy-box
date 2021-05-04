import React, { ReactNode, useEffect, VFC } from 'react';

import { useJwt } from './auth';
import { useRefreshTokenMutation } from './graphql/generated';

export const AppInit: VFC<{ children: ReactNode }> = ({ children }) => {
  const [checkRefreshToken, { data, error }] = useRefreshTokenMutation();

  const { setJwt } = useJwt();

  useEffect(() => {
    checkRefreshToken()
      .then((res) => {
        setJwt({
          token: res.data.refreshToken.token,
          expiry: res.data.refreshToken.tokenExpiry,
        });
      })
      .catch(() => {
        setJwt(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};
