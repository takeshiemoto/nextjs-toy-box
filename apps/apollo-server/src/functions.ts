import { AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';

import { JWT_SECRET } from './environments';

export const getMe = async (req: Request) => {
  const token = <string>req.headers['x-token'];
  if (token) {
    try {
      return verify(token, JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError('You session expired. Sign in again.');
    }
  }
};
