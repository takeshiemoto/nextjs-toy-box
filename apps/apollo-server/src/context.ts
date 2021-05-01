import * as express from 'express';

export type Context = {
  jwt?: {
    secret: string;
    expiresIn: number;
  };
  token?: string;
  req: express.Request;
  res: express.Response;
};
