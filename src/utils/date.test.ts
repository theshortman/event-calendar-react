import { formatDate } from "./date";

describe("formatDate", () => {
  test("should return 2022.04.02", () => {
    expect(formatDate(new Date("2022-04-02"))).toEqual("2022.04.02");
  });

  test("should return 2021.11.12", () => {
    expect(formatDate(new Date("2021-11-12"))).toEqual("2021.11.12");
  });
});
