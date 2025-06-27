let store: Record<string, string> = {};

export const client = {
  isOpen: true,
  get: jest.fn(async (key: string) => store[key] || null),
  set: jest.fn(async (key: string, value: string) => {
    store[key] = value;
  }),
  quit: jest.fn(async () => {
    store = {};
  }),
  connect: jest.fn(async () => {
    store = {};
  })
};
