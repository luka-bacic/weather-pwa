// Round a floating point number to the given precision
// https://stackoverflow.com/a/11832950/3250336
export default function round(number, precisionPoints) {
  // because fuck IE
  if (Number.EPSILON === undefined) {
    Number.EPSILON = Math.pow(2, -52);
  }

  const precision = Math.pow(10, precisionPoints);

  return Math.round((number + Number.EPSILON) * precision) / precision;
}
