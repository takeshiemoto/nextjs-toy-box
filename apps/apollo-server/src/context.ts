export type Context = {
  jwt?: {
    secret: string;
    expiresIn: number;
  };
  token?: string;
};
