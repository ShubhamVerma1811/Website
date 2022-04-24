export const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then((res) => res.json());
