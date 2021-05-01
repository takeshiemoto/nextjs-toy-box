import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-express';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { Resolvers } from './genereted';

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    message: (parent, args, { token, jwt }) => {
      try {
        verify(token, jwt.secret);
        return `認証が必要なデータの取得に成功しました！`;
      } catch (e) {
        throw new AuthenticationError('You session expired. Sign in again.');
      }
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
    signIn: async (parent, { data }, { jwt, res }) => {
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

      const refreshToken = uuidv4();
      const jwtTokenExpiry = new Date(new Date().getTime() + jwt.expiresIn);

      await prisma.user.updateMany({
        data: {
          expiresAt: jwtTokenExpiry,
          refreshToken,
        },
      });

      res.cookie('refresh_token', refreshToken, {
        maxAge: jwt.expiresIn,
        httpOnly: true,
        secure: false,
      });

      return {
        token: createToken(result, jwt),
        tokenExpiry: jwtTokenExpiry,
        refreshToken,
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
