/**
 * Domain Model: Represents current weather data
 * This is the internal representation used throughout the application
 */
export interface WeatherData {
  temperature: number;
  temperatureUnit: string;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  windSpeedUnit: string;
  humidity: number;
  timestamp: Date;
}

/**
 * Domain Model: Represents a geographic location
 */
export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

/**
 * Domain Model: Combined weather and location data
 */
export interface WeatherInfo {
  location: Location;
  weather: WeatherData;
}

/**
 * Domain Model: Historical search entry
 */
export interface SearchHistory {
  id: string;
  cityName: string;
  weather: WeatherData;
  searchedAt: Date;
}
