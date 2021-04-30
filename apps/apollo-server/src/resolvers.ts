import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { Resolvers } from './genereted';

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    message: () => {
      return `Hello world .`;
    },
  },
  Mutation: {
    signUp: async (parent, { data }, { jwt }) => {
      const result = await prisma.user.create({
        data: {
          email: data.email,
          password: await hash(data.password, 10),
        },
      });
      return {
        token: createToken(result, jwt),
      };
    },
    signIn: async (parent, { data }, { jwt }) => {
      const result = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!(await compare(data.password, result.password))) {
        throw new AuthenticationError(
          'ユーザーが存在しないかパスワードが間違っています'
        );
      }
      return {
        token: createToken(result, jwt),
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
