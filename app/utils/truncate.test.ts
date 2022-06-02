import { truncate } from "./truncate";

test("truncate long text", () => {
  const str = "123456789012345678901234567890";
  const result = truncate(str);
  expect(result).toBe("12345678901234567890...");
});

test("should not truncate short text", () => {
  const str = "1234567890";
  const result = truncate(str);
  expect(result).toBe("1234567890");
});

test("truncate length test", () => {
  const str = "1234567890";
  const result = truncate(str, { length: 5 });
  expect(result).toBe("12345...");
});

test("truncate suffix test", () => {
  const str = "123456789012345678901234567890";
  const result = truncate(str, { suffix: "!" });
  expect(result).toBe("12345678901234567890!");
});
