import { parseNumericPart } from '../functions';
import { DEFAULT_CONVERSION_RATIOS } from '../constants';
import type { ConversionRatioConfig } from '../typedefs';

class Chronometric {
  constructor(
    duration: ({ [key: string]: number }|number) = {
      ns: 0,
      μs: 0,
      ms: 0,
      s: 0,
      m: 0,
      h: 0,
      d: 0,
      w: 0,
      mo: 0,
    },
    conversionRatios: ConversionRatioConfig = Chronometric.defaultConversionRatios,
  ) {
    let milliseconds = 0;

    if (typeof duration === 'number') {
      milliseconds = duration;
    } else {
      Object.keys(duration).forEach(key => {
        milliseconds += duration[key] * (conversionRatios[key] || 0)
      });
    }

    const keys = Object.keys(conversionRatios).sort((keyA, keyB) => {
      if (conversionRatios[keyA] < conversionRatios[keyB]) return 1;
      if (conversionRatios[keyA] > conversionRatios[keyB]) return -1;
      return 0;
    });

    keys.forEach(key => {
      let value = Math.trunc(milliseconds / conversionRatios[key]);
      milliseconds -= value * conversionRatios[key];
      Object.defineProperty(this, key, {
        value,
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
    return Object.keys(this).map(key => `${this[key]}${key}`).join(' ');
  }
  
  static fromString(str, conversionRatios = Chronometric.defaultConversionRatios): Chronometric {
    return new Chronometric(Object.keys(conversionRatios).reduce((accumulator, key) => {
      accumulator[key] = parseNumericPart(str, new RegExp(`[\\d+.]+${key}(\\s|$)`));
      return accumulator;
    }, {}), conversionRatios);
  }

  static defaultConversionRatios = DEFAULT_CONVERSION_RATIOS;
}

export default Chronometric;
