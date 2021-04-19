import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  VFC,
} from 'react';

import { Api } from '../Api';

type User = { user: { name: string } } | undefined;
const AuthContext = createContext<User>(undefined);

const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(undefined);
  useEffect(() => {
    Api.checkLogin().then((res) => {
      setUser({
        user: res.user,
      });
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

const AuthLayout: VFC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuth();
  useEffect(() => {
    console.log({ user });
    if (!user) {
      console.log('Login');
    }
  }, [user]);

  return <div>{children}</div>;
};

export { AuthContext, AuthProvider, useAuth, AuthLayout };
