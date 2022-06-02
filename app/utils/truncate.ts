type Options = {
  length?: number;
  suffix?: string;
};
export const truncate = (
  str: string,
  { length = 20, suffix = "..." }: Options = {}
): string => {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length) + suffix;
};
