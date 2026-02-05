export const fetcher = (...args: any) =>
  // @ts-expect-error
  fetch(...args).then((res) => res.json());
