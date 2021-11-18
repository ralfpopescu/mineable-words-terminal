export const serializeData = <T>(data: T[]) => JSON.stringify(data);

export const deserializeData = <T>(queryString: string | number) => {
  if (queryString === "0") return null;
  try {
    return JSON.parse(`${queryString}`) as T;
  } catch (e) {
    return null;
  }
};
