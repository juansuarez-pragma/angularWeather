import { Observable, of, throwError } from 'rxjs';
import { IWeatherService } from './weather.service.interface';
import { WeatherData, Location } from '@models/weather.model';

/**
 * Mock Weather Service for Testing
 * Provides predictable responses for unit tests
 */
export class MockWeatherService implements IWeatherService {
  private mockWeatherData: WeatherData = {
    temperature: 22,
    temperatureUnit: '°C',
    weatherCode: 0,
    weatherDescription: 'Clear sky',
    windSpeed: 10,
    windSpeedUnit: 'km/h',
    humidity: 65,
    timestamp: new Date('2024-01-01T12:00:00Z')
  };

  private mockLocation: Location = {
    latitude: 51.5074,
    longitude: -0.1278,
    city: 'London',
    country: 'United Kingdom'
  };

  private shouldFail = false;

  /**
   * Sets whether the mock should return errors
   */
  setShouldFail(shouldFail: boolean): void {
    this.shouldFail = shouldFail;
  }

  /**
   * Sets custom mock weather data
   */
  setMockWeatherData(data: WeatherData): void {
    this.mockWeatherData = data;
  }

  /**
   * Sets custom mock location
   */
  setMockLocation(location: Location): void {
    this.mockLocation = location;
  }

  /**
   * Mock implementation of getCurrentWeather
   */
  getCurrentWeather(location: Location): Observable<WeatherData> {
    if (this.shouldFail) {
      return throwError(() => new Error('Mock weather service error'));
    }
    return of({ ...this.mockWeatherData });
  }

  /**
   * Mock implementation of searchCityCoordinates
   */
  searchCityCoordinates(cityName: string): Observable<Location> {
    if (this.shouldFail) {
      return throwError(() => new Error(`City "${cityName}" not found`));
    }
    return of({ ...this.mockLocation, city: cityName });
  }
}
