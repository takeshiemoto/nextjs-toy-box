import { AuthenticationError } from 'apollo-server-express';
import { sign } from 'jsonwebtoken';

import { User } from './app/User';
import { Resolvers } from './genereted';

export const resolvers: Resolvers = {
  Query: {
    message: () => {
      return `Hello world .`;
    },
  },
  Mutation: {
    signUp: async (parent, { data }, { jwt }) => {
      const { user } = await User.create(data);
      return {
        token: createToken(user, jwt),
      };
    },
    signIn: async (parent, { data }, { jwt }) => {
      const { user } = await User.findByEmailAndPassword(
        data.email,
        data.password
      );
      if (!user) {
        throw new AuthenticationError('auth error');
      }
      return {
        token: createToken(user, jwt),
      };
    },
  },
};

const createToken = (
  payload: { email: string; password: string },
  jwt: {
    secret: string;
    expiresIn: string | number;
  }
) => {
  return sign(payload, jwt.secret, { expiresIn: jwt.expiresIn });
};
