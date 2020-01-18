import { Chronometric } from '../src/index';

describe("Chronometric", () => {
  describe("instance", () => {
    test("has keys inherited from `conversionRatios` parameter", () => {
      const customConversionRatios = {
        ms: 1,
        s: 1000
      };
      const chronoA = new Chronometric();
      const chronoB = new Chronometric(0, customConversionRatios);
      expect(
        Object.keys(Chronometric.defaultConversionRatios)
          .every(key => Object.keys(chronoA).includes(key))
      ).toBe(true);
      expect(
        Object.keys(customConversionRatios)
          .every(key => Object.keys(chronoB).includes(key))
      ).toBe(true);
    });
  
    test("conversion to primitive value returns value in milliseconds", () => {
      const milliseconds = Math.floor(Math.random() * 1000 * 60 * 200);
      let chrono = new Chronometric(milliseconds);
      let resultMilliseconds = (chrono as number) + 1;
      expect(resultMilliseconds).toEqual(milliseconds + 1);
    });
  
    test("toString() method returns string, containing every key that has non-zero value", () => {
      const chrono = new Chronometric({
        ns: 1,
        μs: 0,
        ms: 1,
        s: 1,
        h: 1,
        d: 0,
        mo: 1
      });
      expect(chrono.toString()).toBe("1mo 1h 1s 1ms 1ns");
    });

    test("correctly converts units", () => {
      const chrono = Chronometric.fromString("25d 65s 1100ms");
      expect(chrono.toString()).toBe("1mo 1w 1m 6s 100ms");
    });
  });

  describe("class", () => {
    test("fromString() method correctly parses string in '1mo 1d 1h 1s' format and returns instance of Chronometric", () => {
      const chronoAInit = Object.keys(Chronometric.defaultConversionRatios).reduce((accumulator, key) => {
        accumulator.push(`1${key}`);
        return accumulator;
      }, []).join(' ');
      const chronoBConversionRatios = {
        mo: Chronometric.defaultConversionRatios.mo,
        y: 365 * Chronometric.defaultConversionRatios.d
      };
      const chronoA = Chronometric.fromString(chronoAInit);
      const chronoB = Chronometric.fromString('1y 1mo', chronoBConversionRatios);
      expect(chronoA).toBeInstanceOf(Chronometric);
      expect(Object.keys(chronoA).every(key => (chronoA as any)[key] === 1)).toBe(true);
      expect(Object.keys(chronoB).every(key => (chronoB as any)[key] === 1)).toBe(true);
    });
  });
});
