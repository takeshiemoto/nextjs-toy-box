import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
  VFC,
} from 'react';

type Jwt = { token?: string };

const AuthContext = createContext<
  { token: Jwt; setToken: (token: string) => void } | undefined
>(undefined);

export const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<Jwt | undefined>(undefined);

  const setToken = useCallback((token: string) => {
    setValue({ token });
  }, []);

  return (
    <AuthContext.Provider value={{ token: value, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer: VFC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ token }) => {
          const httpLink = new HttpLink({
            uri: 'http://localhost:3333/graphql',
          });

          const authMiddleware = new ApolloLink((operation, forward) => {
            if (token) {
              operation.setContext({
                headers: {
                  'x-token': token,
                },
              });
            }
            return forward(operation);
          });

          const client = new ApolloClient({
            link: concat(authMiddleware, httpLink),
            cache: new InMemoryCache(),
          });

          return <ApolloProvider client={client}>{children}</ApolloProvider>;
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

const useJwt = () => useContext(AuthContext);

export { AuthConsumer, useJwt };
