import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  VFC,
} from 'react';

import { Api } from '../Api';

type Session = { id: string; name: string };
const AuthContext = createContext<{
  session: Session | undefined;
  loading: boolean;
}>({ session: undefined, loading: true });

const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<{
    session: Session | undefined;
    loading: boolean;
  }>({ session: undefined, loading: true });
  useEffect(() => {
    Api.checkLogin().then((res) => {
      setState({
        session: {
          id: 'xxxyyy',
          name: res.user.name,
        },
        loading: false,
      });
    });
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

const useSession = () => useContext(AuthContext);

const AuthLayout: VFC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  useEffect(() => {
    console.log({ session });
    if (!session) {
      console.log('リダイレクト');
    }
  }, [session]);

  if (session.loading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export { AuthContext, AuthProvider, useSession, AuthLayout };
