import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: formatCurrencey", () => {
  it("convert cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("rounds down the nearest number", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up the nearest number", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
