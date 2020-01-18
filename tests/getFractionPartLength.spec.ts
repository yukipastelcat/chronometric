import getFractionPartLength from '../src/functions/getFractionPartLength';

describe("getFractionPartLength()", () => {
  test("correctly rounds differend numbers", () => {
    const a = 12345.67891011;
    expect(getFractionPartLength(a)).toEqual(8);
  });
});
