// Rounds a number to given precision and removes trailing zeros
// e.g. round(1.160, 1) --> 1.2
export function round(num: number, precision: number = 1): number {
  return parseFloat(num.toFixed(precision));
}
