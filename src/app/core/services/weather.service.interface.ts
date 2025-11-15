import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '@models/weather.model';
import { Location } from '@models/weather.model';

/**
 * Interface contract for Weather Service
 * This allows for easy mocking and future implementation swaps
 */
export interface IWeatherService {
  getCurrentWeather(location: Location): Observable<WeatherData>;
  searchCityCoordinates(cityName: string): Observable<Location>;
}

/**
 * Injection Token for Weather Service
 * Use this for DI instead of the concrete class for better testability
 */
export const WEATHER_SERVICE_TOKEN = new InjectionToken<IWeatherService>(
  'WeatherService',
  {
    providedIn: 'root',
    factory: () => {
      throw new Error('WEATHER_SERVICE_TOKEN must be provided');
    }
  }
);
