/**
 * @hidden
 * @param num 
 */
function getFractionPartLength(num: number): number {
  return (num.toString().split('.')[1] ?? '').length;
}

export default getFractionPartLength;
