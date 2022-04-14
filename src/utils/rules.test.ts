import { rules } from "./rules";

describe("required rule", () => {
  test("should return object with validation message", () => {
    expect(rules.required("error message")).toEqual({
      required: true,
      message: "error message",
    });
  });

  test("should return object with default validation message", () => {
    expect(rules.required()).toEqual({ required: true, message: "Required!" });
  });
});
