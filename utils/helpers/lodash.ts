// My version of lodash in this file.

export const isEmptyObject = (obj: unknown) =>
  obj && typeof obj === "object" && Object.keys(obj).length === 0;

export const capitalizeWord = (word: string) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};
