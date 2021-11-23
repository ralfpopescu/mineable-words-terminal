export const serializeData = <T>(data: T) => encodeURIComponent(JSON.stringify(data));

export const deserializeData = <T>(queryString: string | number) => {
  if (queryString === "0") return null;
  try {
    return JSON.parse(decodeURIComponent(`${queryString}`)) as T;
  } catch (e) {
    return null;
  }
};
