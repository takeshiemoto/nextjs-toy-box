type IUser = { id: string; email: string; password: string };
import { compare, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const db: IUser[] = [];

export class User {
  public static async create(payload: {
    email: string;
    password: string;
  }): Promise<{ user: IUser }> {
    const newUser = {
      id: uuidv4(),
      email: payload.email,
      password: await hash(payload.password, 10),
    };
    db.push(newUser);
    console.log(db);
    return {
      user: newUser,
    };
  }

  public static async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<undefined | { user: IUser }> {
    const user = db.find((u) => u.email === email);
    if (!user) {
      return undefined;
    }
    return {
      user: (await compare(password, user.password)) ? user : undefined,
    };
  }
}
