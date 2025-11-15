import { Injectable } from '@angular/core';
import { WeatherData, Location } from '@models/weather.model';
import { OpenMeteoCurrentWeatherDTO, GeocodingResultDTO } from '@models/dtos/open-meteo.dto';

/**
 * Weather Mapper
 * Transforms DTOs from external APIs to internal domain models
 * This separation ensures that API changes don't ripple through the entire application
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherMapper {

  /**
   * Maps Open-Meteo weather DTO to domain WeatherData model
   */
  fromOpenMeteoDTO(dto: OpenMeteoCurrentWeatherDTO): WeatherData {
    return {
      temperature: dto.current.temperature_2m,
      temperatureUnit: dto.current_units.temperature_2m,
      weatherCode: dto.current.weather_code,
      weatherDescription: this.getWeatherDescription(dto.current.weather_code),
      windSpeed: dto.current.wind_speed_10m,
      windSpeedUnit: dto.current_units.wind_speed_10m,
      humidity: dto.current.relative_humidity_2m,
      timestamp: new Date(dto.current.time)
    };
  }

  /**
   * Maps Geocoding API result to Location model
   */
  fromGeocodingDTO(dto: GeocodingResultDTO): Location {
    return {
      latitude: dto.latitude,
      longitude: dto.longitude,
      city: dto.name,
      country: dto.country
    };
  }

  /**
   * Converts WMO Weather Code to human-readable description
   * Based on WMO Code Table: https://open-meteo.com/en/docs
   */
  private getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };

    return weatherCodes[code] || 'Unknown';
  }

  /**
   * Gets weather icon emoji based on WMO code
   */
  getWeatherIcon(code: number): string {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 57) return '🌧️';
    if (code >= 61 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 85 && code <= 86) return '🌨️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌡️';
  }
}
