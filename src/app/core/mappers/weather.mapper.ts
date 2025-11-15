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
      0: 'Cielo despejado',
      1: 'Mayormente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna densa',
      56: 'Llovizna helada ligera',
      57: 'Llovizna helada densa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      66: 'Lluvia helada ligera',
      67: 'Lluvia helada intensa',
      71: 'Nevada ligera',
      73: 'Nevada moderada',
      75: 'Nevada intensa',
      77: 'Granos de nieve',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos violentos',
      85: 'Chubascos de nieve ligeros',
      86: 'Chubascos de nieve intensos',
      95: 'Tormenta',
      96: 'Tormenta con granizo ligero',
      99: 'Tormenta con granizo intenso'
    };

    return weatherCodes[code] || 'Desconocido';
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
