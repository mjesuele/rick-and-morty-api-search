// tslint:disable:no-console
export default {
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  },
  log: console.log,
};
