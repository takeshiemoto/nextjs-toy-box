export type Context = {
  jwt?: {
    secret: string;
    expiresIn: number;
  };
  me?: {
    id: string;
    email: string;
    password: string;
    iat: number;
    exp: number;
  };
};
