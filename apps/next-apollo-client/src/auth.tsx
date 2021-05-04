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

type Jwt = { token?: string; expiry?: Date };

const AuthContext = createContext<
  { jwt?: Jwt; setJwt?: (jwt?: Jwt) => void } | undefined | null
>(undefined);

export const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<Jwt | undefined>(undefined);

  const setJwt = useCallback((jwt: Jwt) => {
    setValue(jwt);
  }, []);

  return (
    <AuthContext.Provider value={{ jwt: value, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer: VFC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ jwt }) => {
          const httpLink = new HttpLink({
            uri: '/graphql',
          });

          const authMiddleware = new ApolloLink((operation, forward) => {
            if (!jwt) {
              return forward(operation);
            }
            operation.setContext({
              headers: {
                'x-token': jwt.token,
              },
            });
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

const useJwt = () => {
  const ctx = useContext(AuthContext);
  return {
    loading: ctx.jwt === undefined,
    jwt: ctx.jwt,
    setJwt: ctx.setJwt,
  };
};

export { AuthConsumer, useJwt };
