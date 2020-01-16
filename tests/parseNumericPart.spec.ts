import parseNumericPart from '../src/functions/parseNumericPart';

describe("parseNumericPart()", () => {
  test("returns numeric value", () => {
    expect(typeof parseNumericPart("2d", /\d+d/)).toEqual('number');
  });
  
  test("returns 0 if part wasn't matched", () => {
    expect(parseNumericPart("2kd", /\d+d/)).toEqual(0);
  });
});
