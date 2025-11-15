# AngularWeather - Senior Level MVP

A modern weather application built with Angular 17, demonstrating enterprise-level architecture and best practices.

## Features

- **Current Weather**: Get weather for your current location using browser geolocation
- **City Search**: Search for weather in any city worldwide
- **Search History**: View your recent weather searches (stored in localStorage)
- **Responsive Design**: Beautiful UI that works on all devices
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Testable**: Comprehensive unit tests with mocks

## Architecture

### Modular Design

```
src/app/
├── core/                    # Singleton services (imported once in AppModule)
│   ├── services/
│   │   ├── weather.service.ts
│   │   ├── location.service.ts
│   │   └── storage.service.ts
│   └── mappers/
│       └── weather.mapper.ts
│
├── shared/                  # Reusable components
│   └── components/
│       ├── spinner/
│       ├── error-message/
│       └── weather-card/
│
├── features/                # Feature modules (lazy loaded)
│   ├── current-weather/
│   ├── search/
│   └── history/
│
└── models/                  # Domain models and DTOs
    ├── weather.model.ts
    ├── api-response.model.ts
    └── dtos/
```

### Key Design Patterns

1. **Dependency Injection**: All services use Angular's DI system with InjectionTokens for easy mocking
2. **DTO Pattern**: API responses are mapped to internal domain models via Mappers
3. **Reactive Programming**: RxJS observables for all async operations
4. **Signals**: Modern Angular Signals for reactive state management
5. **Standalone Components**: Modern Angular 17 standalone components
6. **Lazy Loading**: Feature modules are lazy loaded for optimal performance

## Technology Stack

- **Framework**: Angular 17.3
- **Language**: TypeScript 5.4
- **Reactive**: RxJS 7.8
- **Testing**: Jasmine + Karma
- **HTTP Client**: Angular HttpClient
- **API**: Open-Meteo (free, no API key required)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Angular CLI globally (if not already installed):
```bash
npm install -g @angular/cli@17
```

### Development Server

Run the development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`

### Running Tests

Execute unit tests:
```bash
npm test
# or
ng test
```

Run tests with coverage:
```bash
ng test --code-coverage
```

### Building for Production

Build the project:
```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Testing Strategy

### Mock Services

All services have corresponding mock implementations:
- `MockWeatherService`: Provides predictable weather data
- `MockLocationService`: Simulates geolocation

### Test Coverage

- **Component Tests**: State management, lifecycle, user interactions
- **Service Tests**: HTTP requests, error handling, data transformation
- **Storage Tests**: localStorage operations

Example test from `current-weather.component.spec.ts`:
```typescript
it('should transition from loading to success state when data is fetched', (done) => {
  component.ngOnInit();

  expect(component.loadingState()).toBe('loading');

  setTimeout(() => {
    expect(component.loadingState()).toBe('success');
    expect(component.weatherData()).not.toBeNull();
    done();
  }, 100);
});
```

## API Integration

### Open-Meteo API

This app uses the free Open-Meteo API (no key required):
- **Weather API**: `https://api.open-meteo.com/v1/forecast`
- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`

### Data Flow

```
User Action → Component → Service → HTTP → DTO → Mapper → Domain Model → Component State
```

## Project Structure Details

### CoreModule

Provides singleton services:
- `WeatherService`: Handles API calls to Open-Meteo
- `LocationService`: Browser geolocation wrapper
- `StorageService`: localStorage abstraction
- `WeatherMapper`: DTO to domain model transformation

### SharedModule

Exports reusable components:
- `SpinnerComponent`: Loading indicator
- `ErrorMessageComponent`: Error display
- `WeatherCardComponent`: Weather data card

### Feature Modules

Each feature is a lazy-loaded module:
- **CurrentWeather**: Shows weather for current location
- **Search**: Search weather by city name
- **History**: Display search history

## Best Practices Demonstrated

1. ✅ **Separation of Concerns**: Clear separation between presentation, business logic, and data access
2. ✅ **DRY Principle**: Reusable components and services
3. ✅ **SOLID Principles**:
   - Single Responsibility: Each service has one purpose
   - Interface Segregation: IWeatherService interface
   - Dependency Inversion: Depend on abstractions (InjectionTokens)
4. ✅ **Type Safety**: Strict TypeScript configuration
5. ✅ **Testability**: All dependencies can be mocked
6. ✅ **Error Handling**: Centralized error handling in services
7. ✅ **Reactive State**: Signals for reactive UI updates
8. ✅ **Code Organization**: Feature-based folder structure

## Future Enhancements

- State management with NgRx or Ngrx-SignalStore
- PWA capabilities for offline support
- Extended forecast (7-day weather)
- Weather alerts and notifications
- Multiple location favorites
- Unit conversion (Celsius/Fahrenheit)
- Accessibility improvements (WCAG 2.1)

## License

MIT License - Feel free to use this project for learning and development.

## Author

Built with Angular best practices for educational purposes.
