import crypto from "crypto";

const hash = (str: string, length: number): string => {
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex")
    .slice(0, length)
    .toLowerCase();
};

export const hash8 = (str: string): string => {
  return hash(str, 8);
};
