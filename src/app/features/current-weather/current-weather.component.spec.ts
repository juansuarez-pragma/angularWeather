import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '@core/services/weather.service';
import { LocationService } from '@core/services/location.service';
import { MockWeatherService } from '@core/services/weather.service.mock';
import { MockLocationService } from '@core/services/location.service.mock';
import { of, throwError } from 'rxjs';

/**
 * Unit Tests for CurrentWeatherComponent
 * Demonstrates proper mocking and state testing
 */
describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let mockWeatherService: MockWeatherService;
  let mockLocationService: MockLocationService;

  beforeEach(async () => {
    mockWeatherService = new MockWeatherService();
    mockLocationService = new MockLocationService();

    await TestBed.configureTestingModule({
      imports: [CurrentWeatherComponent],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: LocationService, useValue: mockLocationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with idle state', () => {
    expect(component.loadingState()).toBe('idle');
    expect(component.weatherData()).toBeNull();
    expect(component.errorMessage()).toBe('');
  });

  it('should transition from loading to success state when data is fetched successfully', (done) => {
    // Arrange
    const mockWeather = {
      temperature: 25,
      temperatureUnit: '°C',
      weatherCode: 1,
      weatherDescription: 'Mainly clear',
      windSpeed: 15,
      windSpeedUnit: 'km/h',
      humidity: 70,
      timestamp: new Date()
    };
    mockWeatherService.setMockWeatherData(mockWeather);

    // Act
    component.ngOnInit();

    // Assert - Check loading state immediately
    expect(component.loadingState()).toBe('loading');

    // Wait for async operations to complete
    setTimeout(() => {
      expect(component.loadingState()).toBe('success');
      expect(component.weatherData()).not.toBeNull();
      expect(component.weatherData()?.temperature).toBe(25);
      expect(component.errorMessage()).toBe('');
      done();
    }, 100);
  });

  it('should transition to error state when location service fails', (done) => {
    // Arrange
    mockLocationService.setShouldFail(true);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.loadingState()).toBe('loading');

    setTimeout(() => {
      expect(component.loadingState()).toBe('error');
      expect(component.weatherData()).toBeNull();
      expect(component.errorMessage()).toContain('Location permission denied');
      done();
    }, 100);
  });

  it('should transition to error state when weather service fails', (done) => {
    // Arrange
    mockWeatherService.setShouldFail(true);

    // Act
    component.ngOnInit();

    // Assert
    setTimeout(() => {
      expect(component.loadingState()).toBe('error');
      expect(component.weatherData()).toBeNull();
      expect(component.errorMessage()).toBeTruthy();
      done();
    }, 100);
  });

  it('should refresh weather when refreshWeather is called', (done) => {
    // Arrange
    component.ngOnInit();

    setTimeout(() => {
      expect(component.loadingState()).toBe('success');

      // Act - Refresh weather
      component.refreshWeather();
      expect(component.loadingState()).toBe('loading');

      setTimeout(() => {
        expect(component.loadingState()).toBe('success');
        done();
      }, 100);
    }, 100);
  });

  it('should have isLoading computed signal reflect loading state', () => {
    component.loadingState.set('loading');
    expect(component.isLoading()).toBe(true);

    component.loadingState.set('success');
    expect(component.isLoading()).toBe(false);

    component.loadingState.set('error');
    expect(component.isLoading()).toBe(false);
  });
});
