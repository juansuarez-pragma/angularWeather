import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { WeatherService } from '@core/services/weather.service';
import { StorageService } from '@core/services/storage.service';
import { WeatherData, Location, SearchHistory } from '@models/weather.model';
import { LoadingState } from '@models/api-response.model';
import { switchMap } from 'rxjs/operators';

/**
 * Search Component
 * Allows users to search for weather by city name
 * Saves successful searches to localStorage
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  template: `
    <div class="search-container">
      <h1 class="page-title">Buscar Clima</h1>
      <p class="page-subtitle">Encuentra el clima de cualquier ciudad</p>

      <!-- Search Form -->
      <form [formGroup]="searchForm" (ngSubmit)="onSearch()" class="search-form">
        <div class="form-group">
          <input
            type="text"
            formControlName="cityName"
            placeholder="Ingresa el nombre de una ciudad (ej: Londres, Tokio, Nueva York)"
            class="search-input"
            [class.error]="isFieldInvalid('cityName')"
          />
          <div class="error-text" *ngIf="isFieldInvalid('cityName')">
            Por favor ingresa un nombre de ciudad
          </div>
        </div>

        <button
          type="submit"
          class="search-button"
          [disabled]="searchForm.invalid || isLoading()"
        >
          {{ isLoading() ? '🔍 Buscando...' : '🔍 Buscar' }}
        </button>
      </form>

      <!-- Loading State -->
      <app-spinner *ngIf="loadingState() === 'loading'"></app-spinner>

      <!-- Error State -->
      <app-error-message
        *ngIf="loadingState() === 'error'"
        [title]="'Búsqueda Fallida'"
        [message]="errorMessage()"
      ></app-error-message>

      <!-- Success State -->
      <div *ngIf="loadingState() === 'success'" class="weather-result">
        <app-weather-card
          [weather]="weatherData()"
          [cityName]="cityName()"
          [countryName]="countryName()"
          [showTimestamp]="true"
        ></app-weather-card>

        <div class="success-message">
          ✅ Datos del clima guardados en el historial
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
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

    .search-form {
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-input.error {
      border-color: #f44336;
    }

    .error-text {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .search-button {
      width: 100%;
      padding: 1rem;
      background-color: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .search-button:hover:not(:disabled) {
      background-color: #5568d3;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .search-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .weather-result {
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

    .success-message {
      text-align: center;
      margin-top: 1rem;
      padding: 0.75rem;
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      border-radius: 8px;
      font-size: 0.9rem;
    }
  `]
})
export class SearchComponent {
  searchForm: FormGroup;

  // Signals for reactive state management
  loadingState = signal<LoadingState>('idle');
  weatherData = signal<WeatherData | null>(null);
  errorMessage = signal<string>('');
  cityName = signal<string>('');
  countryName = signal<string>('');

  // Computed signals
  isLoading = computed(() => this.loadingState() === 'loading');

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {
    this.searchForm = this.fb.group({
      cityName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  /**
   * Handles form submission
   * Searches for city coordinates then fetches weather
   */
  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const cityName = this.searchForm.value.cityName.trim();
    this.loadingState.set('loading');
    this.errorMessage.set('');

    // Chain geocoding and weather requests
    this.weatherService.searchCityCoordinates(cityName).pipe(
      switchMap((location: Location) => {
        this.cityName.set(location.city || cityName);
        this.countryName.set(location.country || '');
        return this.weatherService.getCurrentWeather(location);
      })
    ).subscribe({
      next: (weather: WeatherData) => {
        this.weatherData.set(weather);
        this.loadingState.set('success');
        this.saveToHistory(weather);
      },
      error: (error: Error) => {
        this.handleError(error.message);
      }
    });
  }

  /**
   * Saves successful search to localStorage
   */
  private saveToHistory(weather: WeatherData): void {
    const historyEntry: SearchHistory = {
      id: Date.now().toString(),
      cityName: this.cityName(),
      weather: weather,
      searchedAt: new Date()
    };

    this.storageService.saveToHistory(historyEntry);
  }

  /**
   * Checks if a form field is invalid and touched
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.searchForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
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
