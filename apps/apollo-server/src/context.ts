export type Context = {
  jwt?: {
    secret: string;
    expiresIn: number;
  };
};
