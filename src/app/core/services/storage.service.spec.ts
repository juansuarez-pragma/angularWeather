import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { SearchHistory } from '@models/weather.model';

/**
 * Unit Tests for StorageService
 * Tests localStorage interactions
 */
describe('StorageService', () => {
  let service: StorageService;
  let localStorageSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });

    service = TestBed.inject(StorageService);

    // Mock localStorage
    let store: { [key: string]: string } = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save search history to localStorage', () => {
    // Arrange
    const mockHistory: SearchHistory = {
      id: '123',
      cityName: 'London',
      weather: {
        temperature: 20,
        temperatureUnit: '°C',
        weatherCode: 0,
        weatherDescription: 'Clear sky',
        windSpeed: 10,
        windSpeedUnit: 'km/h',
        humidity: 65,
        timestamp: new Date()
      },
      searchedAt: new Date()
    };

    // Act
    service.saveToHistory(mockHistory);

    // Assert
    expect(localStorage.setItem).toHaveBeenCalled();
    const savedHistory = service.getHistory();
    expect(savedHistory.length).toBe(1);
    expect(savedHistory[0].cityName).toBe('London');
  });

  it('should retrieve history from localStorage', () => {
    // Arrange
    const mockHistory: SearchHistory[] = [
      {
        id: '1',
        cityName: 'London',
        weather: {
          temperature: 20,
          temperatureUnit: '°C',
          weatherCode: 0,
          weatherDescription: 'Clear sky',
          windSpeed: 10,
          windSpeedUnit: 'km/h',
          humidity: 65,
          timestamp: new Date()
        },
        searchedAt: new Date()
      }
    ];

    (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify(mockHistory));

    // Act
    const history = service.getHistory();

    // Assert
    expect(history.length).toBe(1);
    expect(history[0].cityName).toBe('London');
  });

  it('should return empty array when no history exists', () => {
    // Arrange
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);

    // Act
    const history = service.getHistory();

    // Assert
    expect(history).toEqual([]);
  });

  it('should remove duplicate cities and keep the latest', () => {
    // Arrange
    const existingHistory: SearchHistory = {
      id: '1',
      cityName: 'London',
      weather: {
        temperature: 18,
        temperatureUnit: '°C',
        weatherCode: 1,
        weatherDescription: 'Mainly clear',
        windSpeed: 8,
        windSpeedUnit: 'km/h',
        humidity: 60,
        timestamp: new Date('2024-01-01')
      },
      searchedAt: new Date('2024-01-01')
    };

    service.saveToHistory(existingHistory);

    const newHistory: SearchHistory = {
      id: '2',
      cityName: 'London',
      weather: {
        temperature: 20,
        temperatureUnit: '°C',
        weatherCode: 0,
        weatherDescription: 'Clear sky',
        windSpeed: 10,
        windSpeedUnit: 'km/h',
        humidity: 65,
        timestamp: new Date('2024-01-02')
      },
      searchedAt: new Date('2024-01-02')
    };

    // Act
    service.saveToHistory(newHistory);
    const history = service.getHistory();

    // Assert
    expect(history.length).toBe(1);
    expect(history[0].id).toBe('2');
    expect(history[0].weather.temperature).toBe(20);
  });

  it('should clear all history', () => {
    // Arrange
    const mockHistory: SearchHistory = {
      id: '123',
      cityName: 'London',
      weather: {
        temperature: 20,
        temperatureUnit: '°C',
        weatherCode: 0,
        weatherDescription: 'Clear sky',
        windSpeed: 10,
        windSpeedUnit: 'km/h',
        humidity: 65,
        timestamp: new Date()
      },
      searchedAt: new Date()
    };

    service.saveToHistory(mockHistory);

    // Act
    service.clearHistory();

    // Assert
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('should remove specific item from history', () => {
    // Arrange
    const history1: SearchHistory = {
      id: '1',
      cityName: 'London',
      weather: {
        temperature: 20,
        temperatureUnit: '°C',
        weatherCode: 0,
        weatherDescription: 'Clear sky',
        windSpeed: 10,
        windSpeedUnit: 'km/h',
        humidity: 65,
        timestamp: new Date()
      },
      searchedAt: new Date()
    };

    const history2: SearchHistory = {
      id: '2',
      cityName: 'Paris',
      weather: {
        temperature: 18,
        temperatureUnit: '°C',
        weatherCode: 1,
        weatherDescription: 'Mainly clear',
        windSpeed: 8,
        windSpeedUnit: 'km/h',
        humidity: 60,
        timestamp: new Date()
      },
      searchedAt: new Date()
    };

    service.saveToHistory(history1);
    service.saveToHistory(history2);

    // Act
    service.removeFromHistory('1');
    const remainingHistory = service.getHistory();

    // Assert
    expect(remainingHistory.length).toBe(1);
    expect(remainingHistory[0].id).toBe('2');
    expect(remainingHistory[0].cityName).toBe('Paris');
  });
});
