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
        observer.error(new Error('La geolocalización no es compatible con tu navegador'));
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
          let errorMessage = 'No se pudo obtener tu ubicación';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso de ubicación denegado. Por favor, habilita el acceso a la ubicación.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'La información de ubicación no está disponible.';
              break;
            case error.TIMEOUT:
              errorMessage = 'La solicitud de ubicación ha expirado.';
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
