export class Api {
  static async checkLogin() {
    return {
      user: {
        name: 'John',
      },
    };
  }
}
