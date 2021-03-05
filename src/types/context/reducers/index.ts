import { WeatherAction } from 'context/actions';
import { WeatherState } from 'context/state';

export interface WeatherReducer {
  (state: WeatherState, action: WeatherAction): WeatherState;
}
