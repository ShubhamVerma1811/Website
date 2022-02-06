export const minutesToRead = (text: string) => {
  const words = text.split(' ');
  const count = words.length;
  const minutes = Math.round(count / 200);
  return minutes;
};
