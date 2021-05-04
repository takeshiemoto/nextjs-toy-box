import { ApolloServer } from 'apollo-server-express';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { JWT_EXPIRES_IN, JWT_SECRET } from './environments';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const app = express();
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async (ctx) => {
    return {
      token: <string>ctx.req.headers['x-token'],
      jwt: {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES_IN,
      },
      res: ctx.res,
      req: ctx.req,
    };
  },
});

server.applyMiddleware({ app });

const port = process.env.port || 3333;
app
  .listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  })
  .on('error', console.error);
