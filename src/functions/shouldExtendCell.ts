import { HourlyResponse, ExtendHourlyClasses } from '../types';
import { round } from './';

// Dont iterate over these object props
const skipableProps = ['dew_point', 'dt', 'visibility', 'weather', 'humidity'];

export function shouldExtendCell(
  currentHour: HourlyResponse,
  index: number,
  allHours: HourlyResponse[]
): ExtendHourlyClasses {
  let cellsToExtend: ExtendHourlyClasses = {};

  //skip first element
  if (index) {
    // Go through each prop in the object and compare values
    for (const key in currentHour) {
      // Skip props that are not displayed in the hourly section
      if (skipableProps.includes(key)) {
        continue;
      }

      // Compare and round these props to no precision
      if (
        key === 'pressure' ||
        key === 'uvi' ||
        key === 'clouds' ||
        key === 'wind_speed' ||
        key === 'wind_deg'
      ) {
        if (!areLast3CellsSame(allHours, index, key)) {
          console.log('the same with key ', key);
          if (
            round(currentHour[key], 0) === round(allHours[index - 1][key], 0)
          ) {
            cellsToExtend[key] = true;
          }
        }
      }

      // Compare and round these values to 1 decimal point precision
      if (key === 'temp' || key === 'feels_like') {
        if (round(currentHour[key]) === round(allHours[index - 1][key])) {
          cellsToExtend[key] = true;
        }
      }

      // Compare and round these props to 2 precision points
      if (key === 'pop') {
        if (round(currentHour[key]) === round(allHours[index - 1][key])) {
          cellsToExtend[key] = true;
        }
      }

      // Rainfall and snowfall have a nested value.
      // Example: currentHour.rain['1h']
      if (key === 'rain' || key === 'snow') {
        if (
          round(currentHour[key]!['1h'], 0) ===
          round(allHours[index - 1][key]!['1h'], 0)
        ) {
          cellsToExtend[key] = true;
        }
      }
      // If both hours don't have `rain` (as its an optional prop), extend it
      if (
        !currentHour.hasOwnProperty('rain') &&
        !allHours[index - 1].hasOwnProperty('rain')
      ) {
        cellsToExtend['rain'] = true;
      }
      // If both hours don't have `snow` (as its an optional prop), extend it
      if (
        !currentHour.hasOwnProperty('snow') &&
        !allHours[index - 1].hasOwnProperty('snow')
      ) {
        cellsToExtend['snow'] = true;
      }
    }
  }

  return cellsToExtend;
}

const yes = [
  'pressure',
  'uvi',
  'clouds',
  'wind_speed',
  'wind_deg',
  'temp',
  'feels_like',
  'pop',
  'rain',
  'snow',
];

function areLast3CellsSame(
  allHours: HourlyResponse[],
  index: number,
  key: string
): boolean {
  let areCellsTheSame = false;

  if (index > 3) {
    // Compare and round these props to no precision

    if (
      key === 'pressure' ||
      key === 'uvi' ||
      key === 'clouds' ||
      key === 'wind_speed' ||
      key === 'wind_deg'
    ) {
      const current = round(allHours[index][key], 0);
      const oneBefore = round(allHours[index - 1][key], 0);
      const twoBefore = round(allHours[index - 2][key], 0);

      if (current === oneBefore && oneBefore === twoBefore) {
        areCellsTheSame = true;
      }
    }
  } else {
    areCellsTheSame = false;
  }

  return areCellsTheSame;
}
