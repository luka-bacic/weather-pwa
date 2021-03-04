import { UvInfo } from 'types';

// Takes a number and returns the UV rating, based on
// this scale https://www.epa.gov/sunsafety/uv-index-scale-0
//
// @param uv - number
//
// @returns object - interface UvInfo
//
export function uvScale(uv: number): UvInfo {
  const roundedUv = Math.round(uv);

  if (roundedUv <= 2) {
    return {
      value: roundedUv,
      description: 'Low',
      cssClass: 'low',
      longDescription:
        'No protection needed. You can safely stay outside using minimal sun protection.',
    };
  } else if (roundedUv <= 5) {
    return {
      value: roundedUv,
      description: 'Moderate',
      cssClass: 'moderate',
      longDescription:
        'Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.',
    };
  } else if (roundedUv <= 7) {
    return {
      value: roundedUv,
      description: 'High',
      cssClass: 'high',
      longDescription:
        'Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.',
    };
  } else if (roundedUv <= 10) {
    return {
      value: roundedUv,
      description: 'Very high',
      cssClass: 'very-high',
      longDescription:
        'Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.',
    };
  } else {
    return {
      value: roundedUv,
      description: 'Extreme',
      cssClass: 'extreme',
      longDescription:
        'Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.',
    };
  }
}
