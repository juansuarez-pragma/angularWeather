import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { WeatherMapper } from '@core/mappers/weather.mapper';
import { OpenMeteoCurrentWeatherDTO, GeocodingResponseDTO } from '@models/dtos/open-meteo.dto';

/**
 * Unit Tests for WeatherService
 * Tests HTTP interactions and error handling
 */
describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let weatherMapper: WeatherMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService, WeatherMapper]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    weatherMapper = TestBed.inject(WeatherMapper);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentWeather', () => {
    it('should fetch and transform weather data successfully', () => {
      // Arrange
      const mockLocation = { latitude: 51.5074, longitude: -0.1278 };
      const mockDTO: OpenMeteoCurrentWeatherDTO = {
        latitude: 51.5074,
        longitude: -0.1278,
        generationtime_ms: 0.5,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 11,
        current_units: {
          time: 'iso8601',
          interval: 'seconds',
          temperature_2m: '°C',
          relative_humidity_2m: '%',
          weather_code: 'wmo code',
          wind_speed_10m: 'km/h'
        },
        current: {
          time: '2024-01-01T12:00',
          interval: 900,
          temperature_2m: 20,
          relative_humidity_2m: 65,
          weather_code: 0,
          wind_speed_10m: 10
        }
      };

      // Act
      service.getCurrentWeather(mockLocation).subscribe(weather => {
        // Assert
        expect(weather).toBeTruthy();
        expect(weather.temperature).toBe(20);
        expect(weather.humidity).toBe(65);
        expect(weather.weatherDescription).toBe('Clear sky');
      });

      // Assert HTTP request
      const req = httpMock.expectOne(request =>
        request.url.includes('api.open-meteo.com/v1/forecast')
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('latitude')).toBe('51.5074');
      expect(req.request.params.get('longitude')).toBe('-0.1278');

      req.flush(mockDTO);
    });

    it('should handle HTTP errors gracefully', () => {
      // Arrange
      const mockLocation = { latitude: 51.5074, longitude: -0.1278 };

      // Act
      service.getCurrentWeather(mockLocation).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          // Assert
          expect(error).toBeTruthy();
          expect(error.message).toContain('Server Error');
        }
      });

      // Simulate HTTP error
      const req = httpMock.expectOne(request =>
        request.url.includes('api.open-meteo.com/v1/forecast')
      );
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('searchCityCoordinates', () => {
    it('should fetch city coordinates successfully', () => {
      // Arrange
      const cityName = 'London';
      const mockResponse: GeocodingResponseDTO = {
        results: [{
          id: 1,
          name: 'London',
          latitude: 51.5074,
          longitude: -0.1278,
          elevation: 11,
          feature_code: 'PPLC',
          country_code: 'GB',
          timezone: 'Europe/London',
          country_id: 1,
          country: 'United Kingdom'
        }],
        generationtime_ms: 0.5
      };

      // Act
      service.searchCityCoordinates(cityName).subscribe(location => {
        // Assert
        expect(location).toBeTruthy();
        expect(location.city).toBe('London');
        expect(location.latitude).toBe(51.5074);
        expect(location.longitude).toBe(-0.1278);
      });

      // Assert HTTP request
      const req = httpMock.expectOne(request =>
        request.url.includes('geocoding-api.open-meteo.com/v1/search')
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('name')).toBe(cityName);

      req.flush(mockResponse);
    });

    it('should throw error when city is not found', () => {
      // Arrange
      const cityName = 'NonExistentCity';
      const mockResponse: GeocodingResponseDTO = {
        results: [],
        generationtime_ms: 0.5
      };

      // Act
      service.searchCityCoordinates(cityName).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          // Assert
          expect(error.message).toContain('not found');
        }
      });

      const req = httpMock.expectOne(request =>
        request.url.includes('geocoding-api.open-meteo.com/v1/search')
      );
      req.flush(mockResponse);
    });
  });
});
