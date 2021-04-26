import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.applyMiddleware({ app })

const port = process.env.port || 3333;
app
  .listen(port, () => {
    console.log(`Listening at http://localhost:${port}/graphql`);
  })
  .on('error', console.error);