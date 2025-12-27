// Mock CSS modules - returns an object with class names as keys and values
const styleMock = new Proxy(
  {},
  {
    get: (_target, prop: string) => prop,
  }
);

export default styleMock;
