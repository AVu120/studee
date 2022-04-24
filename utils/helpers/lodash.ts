// My version of lodash in this file.

export const isEmptyObject = (obj: unknown) =>
  obj && typeof obj === "object" && Object.keys(obj).length === 0;
