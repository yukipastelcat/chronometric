import roundToPrecision from '../src/functions/roundToPrecision';

describe("roundToPrecision()", () => {
  test("correctly rounds differend numbers", () => {
    const a = 12345.678910;
    expect(roundToPrecision(a, 0)).toEqual(12346);
    expect(roundToPrecision(a, 1)).toEqual(12345.7);
    expect(roundToPrecision(a, 2)).toEqual(12345.68);
  });
});
