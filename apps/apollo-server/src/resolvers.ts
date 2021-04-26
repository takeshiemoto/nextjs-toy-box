import { sign } from 'jsonwebtoken';

import { Resolvers } from './genereted';

const SECRET = 'MY_SECRET';

export const resolvers: Resolvers = {
  Query: {
    message: () => 'Hi Takeshi',
  },
  Mutation: {
    signIn: (parent, { data: { email, password } }) => {
      console.log(email, password);
      const token = sign({ user: `${email}` }, SECRET, {
        expiresIn: 2 * 60,
      });
      return {
        user: {
          name: 'Takeshi',
          id: 'xxxxyyy',
        },
        token,
      };
    },
  },
};
