import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { WeatherService } from '@core/services/weather.service';
import { LocationService } from '@core/services/location.service';
import { WeatherData, Location } from '@models/weather.model';
import { LoadingState } from '@models/api-response.model';
import { forkJoin } from 'rxjs';

/**
 * Current Weather Component
 * Displays weather for user's current location using Geolocation API
 * Uses Angular Signals for reactive state management
 */
@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="current-weather-container">
      <h1 class="page-title">Current Weather</h1>
      <p class="page-subtitle">Weather at your current location</p>

      <!-- Loading State -->
      <app-spinner *ngIf="loadingState() === 'loading'"></app-spinner>

      <!-- Error State -->
      <app-error-message
        *ngIf="loadingState() === 'error'"
        [title]="'Unable to Load Weather'"
        [message]="errorMessage()"
      ></app-error-message>

      <!-- Success State -->
      <div *ngIf="loadingState() === 'success'" class="weather-content">
        <app-weather-card
          [weather]="weatherData()"
          [cityName]="locationInfo()"
          [showTimestamp]="true"
        ></app-weather-card>

        <button class="refresh-button" (click)="refreshWeather()">
          🔄 Refresh Weather
        </button>
      </div>
    </div>
  `,
  styles: [`
    .current-weather-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .page-title {
      text-align: center;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .page-subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }

    .weather-content {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .refresh-button {
      display: block;
      margin: 2rem auto 0;
      padding: 0.75rem 2rem;
      background-color: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .refresh-button:hover {
      background-color: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .refresh-button:active {
      transform: translateY(0);
    }
  `]
})
export class CurrentWeatherComponent implements OnInit {
  // Signals for reactive state management
  loadingState = signal<LoadingState>('idle');
  weatherData = signal<WeatherData | null>(null);
  errorMessage = signal<string>('');
  locationInfo = signal<string>('');

  // Computed signals
  isLoading = computed(() => this.loadingState() === 'loading');
  hasError = computed(() => this.loadingState() === 'error');

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadCurrentWeather();
  }

  /**
   * Loads weather for current location
   * Orchestrates geolocation and weather API calls
   */
  loadCurrentWeather(): void {
    this.loadingState.set('loading');
    this.errorMessage.set('');

    this.locationService.getCurrentLocation().subscribe({
      next: (location: Location) => {
        this.fetchWeatherForLocation(location);
      },
      error: (error: Error) => {
        this.handleError(error.message);
      }
    });
  }

  /**
   * Fetches weather data for a specific location
   */
  private fetchWeatherForLocation(location: Location): void {
    this.weatherService.getCurrentWeather(location).subscribe({
      next: (weather: WeatherData) => {
        this.weatherData.set(weather);
        this.locationInfo.set(`Lat: ${location.latitude.toFixed(2)}, Lon: ${location.longitude.toFixed(2)}`);
        this.loadingState.set('success');
      },
      error: (error: Error) => {
        this.handleError(error.message);
      }
    });
  }

  /**
   * Refreshes weather data
   */
  refreshWeather(): void {
    this.loadCurrentWeather();
  }

  /**
   * Centralized error handling
   */
  private handleError(message: string): void {
    this.errorMessage.set(message);
    this.loadingState.set('error');
    this.weatherData.set(null);
  }
}
