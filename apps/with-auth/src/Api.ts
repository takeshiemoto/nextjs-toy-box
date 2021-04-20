const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

export const Api = {
  checkLogin: async () => {
    await sleep(2000);
    return {
      user: {
        id: '1234',
        name: 'taro',
      },
    };
  },
};
