import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Location } from '@models/weather.model';

/**
 * Location Service
 * Handles browser geolocation API access
 */
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /**
   * Gets the user's current geographic location using the browser's Geolocation API
   * @returns Observable of Location coordinates
   */
  getCurrentLocation(): Observable<Location> {
    return new Observable((observer: Observer<Location>) => {
      if (!navigator.geolocation) {
        observer.error(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          observer.next(location);
          observer.complete();
        },
        (error: GeolocationPositionError) => {
          let errorMessage = 'Unable to retrieve your location';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }

          observer.error(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }
}
