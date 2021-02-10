import { UvInfo } from 'types';

// Takes a number and returns the UV rating, based on
// this scale https://www.epa.gov/sunsafety/uv-index-scale-0
//
// @param uv - number
//
// @returns object - interface UvInfo
//
function uvScale(uv: number): UvInfo {
  const roundedUv = Math.round(uv);

  let result: UvInfo = {
    value: roundedUv,
    description: '',
    longDescription: '',
  };

  if (roundedUv <= 2) {
    result.description = 'low';
    result.longDescription =
      'No protection needed. You can safely stay outside using minimal sun protection.';
  } else if (roundedUv <= 5) {
    result.description = 'moderate';
    result.longDescription =
      'Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.';
  } else if (roundedUv <= 7) {
    result.description = 'high';
    result.longDescription =
      'Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.';
  } else if (roundedUv <= 10) {
    result.description = 'very high';
    result.longDescription =
      'Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.';
  } else {
    result.description = 'extreme';
    result.longDescription =
      'Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.';
  }

  return result;
}

export default uvScale;
