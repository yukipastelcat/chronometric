/**
 * @hidden
 * @param number Numeric value to round
 * @param precision Fraction part precision
 */
function roundToPrecision(number: number, precision: number): number {
  const k = Math.pow(10, precision);
  return Math.round(number * k) / k;
}

export default roundToPrecision;
