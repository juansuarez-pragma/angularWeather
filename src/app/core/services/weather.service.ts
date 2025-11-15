import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IWeatherService } from './weather.service.interface';
import { WeatherData, Location } from '@models/weather.model';
import { OpenMeteoCurrentWeatherDTO, GeocodingResponseDTO } from '@models/dtos/open-meteo.dto';
import { WeatherMapper } from '../mappers/weather.mapper';

/**
 * Weather Service Implementation using Open-Meteo API
 * Handles all weather-related API calls and data transformation
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {
  private readonly WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
  private readonly GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  constructor(
    private readonly http: HttpClient,
    private readonly weatherMapper: WeatherMapper
  ) {}

  /**
   * Fetches current weather for a given location
   * @param location Geographic coordinates
   * @returns Observable of WeatherData
   */
  getCurrentWeather(location: Location): Observable<WeatherData> {
    const params = {
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      timezone: 'auto'
    };

    return this.http.get<OpenMeteoCurrentWeatherDTO>(this.WEATHER_API_URL, { params }).pipe(
      map(dto => this.weatherMapper.fromOpenMeteoDTO(dto)),
      catchError(this.handleError)
    );
  }

  /**
   * Searches for city coordinates by name using geocoding API
   * @param cityName Name of the city to search
   * @returns Observable of Location with coordinates
   */
  searchCityCoordinates(cityName: string): Observable<Location> {
    const params = {
      name: cityName,
      count: '1',
      language: 'en',
      format: 'json'
    };

    return this.http.get<GeocodingResponseDTO>(this.GEOCODING_API_URL, { params }).pipe(
      map(response => {
        if (!response.results || response.results.length === 0) {
          throw new Error(`City "${cityName}" not found`);
        }
        return this.weatherMapper.fromGeocodingDTO(response.results[0]);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Centralized error handling
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error (${error.status}): ${error.message}`;
    }

    console.error('WeatherService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
