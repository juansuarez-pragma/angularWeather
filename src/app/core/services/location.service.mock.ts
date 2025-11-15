import { Observable, of, throwError } from 'rxjs';
import { Location } from '@models/weather.model';

/**
 * Mock Location Service for Testing
 * Simulates browser geolocation without requiring actual permissions
 */
export class MockLocationService {
  private mockLocation: Location = {
    latitude: 40.7128,
    longitude: -74.006
  };

  private shouldFail = false;

  /**
   * Sets whether the mock should return errors
   */
  setShouldFail(shouldFail: boolean): void {
    this.shouldFail = shouldFail;
  }

  /**
   * Sets custom mock location
   */
  setMockLocation(location: Location): void {
    this.mockLocation = location;
  }

  /**
   * Mock implementation of getCurrentLocation
   */
  getCurrentLocation(): Observable<Location> {
    if (this.shouldFail) {
      return throwError(() => new Error('Location permission denied'));
    }
    return of({ ...this.mockLocation });
  }
}
