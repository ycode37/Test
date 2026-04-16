export const fakeApi = {
  async sync(action, load) {
    const delay = Math.random() * 800 + 200;
    await new Promise((res) => setTimeout(res, delay));
    return { success: true, action, load };
  },
};
