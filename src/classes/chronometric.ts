import parseNumericPart from '../functions/parseNumericPart';
import roundToPrecision from '../functions/roundToPrecision';
import getFractionPartLength from '../functions/getFractionPartLength';
import { DEFAULT_CONVERSION_RATIOS } from '../constants/conversionRatios';
import { ConversionRatioConfig } from '../typedefs/index';

class Chronometric {
  constructor(
    duration: ({ [key: string]: number }|number) = {
      ms: 0,
      s: 0,
      m: 0,
      h: 0,
      d: 0,
      w: 0,
      mo: 0,
      y: 0
    },
    conversionRatios: ConversionRatioConfig = Chronometric.defaultConversionRatios,
  ) {
    let milliseconds = 0;

    /* istanbul ignore next */
    if (typeof duration === 'number') {
      milliseconds = duration;
    } else {
      Object.keys(duration).forEach(key => {
        milliseconds += duration[key] * (conversionRatios[key] || 0)
      });
    }

    /* istanbul ignore next */
    const keys = Object.keys(conversionRatios).sort((keyA, keyB) => {
      if (conversionRatios[keyA] < conversionRatios[keyB]) return 1;
      if (conversionRatios[keyA] > conversionRatios[keyB]) return -1;
      return 0;
    });
    const maxPrecision = getFractionPartLength(conversionRatios[keys[keys.length - 1]]);

    keys.forEach(key => {
      let value = Math.trunc(milliseconds / conversionRatios[key]);
      milliseconds = roundToPrecision(milliseconds - (value * conversionRatios[key]), maxPrecision);
      Object.defineProperty(this, key, {
        value,
        enumerable: true,
        writable: true,
      });
    });

    Object.defineProperty(this, Symbol.toPrimitive, {
      value() {
        return keys.map(key => this[key] * conversionRatios[key]).reduce((accumulator, value) => {
          accumulator += value;
          return accumulator;
        }, 0);
      }
    });
  }

  toString(): string {
    return Object.keys(this).filter(key => (this as any)[key] !== 0).map(key => `${(this as any)[key]}${key}`).join(' ');
  }
  
  /**
   * Parses string in "1d 1w 1mo" format and creates Chronometric instance
   * @param str - String to parse duration from
   * @param conversionRatios - Custom conversion ratios
   */
  static fromString(str: string, conversionRatios = Chronometric.defaultConversionRatios): Chronometric {
    return new Chronometric(Object.keys(conversionRatios).reduce((accumulator, key) => {
      accumulator[key] = parseNumericPart(str, new RegExp(`[\\d+.]+${key}(\\s|$)`));
      return accumulator;
    }, {} as any), conversionRatios);
  }

  /**
   * Default conversion ratios for instances of Chronometric
   */
  static defaultConversionRatios: ConversionRatioConfig = DEFAULT_CONVERSION_RATIOS;
}

export default Chronometric;
