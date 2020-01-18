/**
 * @hidden
 * @param str 
 * @param regex 
 */
function parseNumericPart(str: string, regex: RegExp): number {
  const [part] = str.match(regex) ?? [''];
  const partAsNumber = Number(part.replace(/\D/g, ''));
  return partAsNumber;
}

export default parseNumericPart;
