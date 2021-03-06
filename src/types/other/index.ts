import { HourlyResponse } from 'types/forecast';

// Used by src/functions/uvScale
export interface UvInfo {
  value: number; // integer representing the uv index scale value
  description: 'Low' | 'Moderate' | 'High' | 'Very high' | 'Extreme';
  longDescription: string; // safety instructions, how longs its safe to stay on the sun
  cssClass: 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';
}

// Represent the URL of a weather icon, and the alt text
export interface IconData {
  url: string;
  description: string;
}

// Represents a day in the hourly representation of the forecast
// See src/components/weather/HourlyForecast
export interface Day {
  dayNumber: string;
  label: string;
  weather: HourlyResponse[];
}

// Wether to extend a cell in hourly forecast
export interface ExtendHourlyClasses {
  temp?: boolean;
  feels_like?: boolean;
  pressure?: boolean;
  uvi?: boolean;
  clouds?: boolean;
  wind_speed?: boolean;
  wind_deg?: boolean;
  pop?: boolean;
  rain?: boolean;
  snow?: boolean;
}

export interface FilterIdentifier {
  id:
    | 'temp'
    | 'feelsLike'
    | 'precip'
    | 'rain'
    | 'snow'
    | 'wind'
    | 'uv'
    | 'clouds'
    | 'pressure';
  value: boolean;
}
