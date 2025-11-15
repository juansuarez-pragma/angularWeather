import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '@models/weather.model';
import { WeatherMapper } from '@core/mappers/weather.mapper';

/**
 * Reusable Weather Card Component
 * Displays weather information in a card format
 */
@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weather-card" *ngIf="weather">
      <div class="weather-icon">
        {{ getWeatherIcon() }}
      </div>
      <div class="weather-info">
        <h2 class="temperature">
          {{ weather.temperature }}{{ weather.temperatureUnit }}
        </h2>
        <p class="description">{{ weather.weatherDescription }}</p>
        <div class="details">
          <div class="detail-item">
            <span class="detail-label">Humedad:</span>
            <span class="detail-value">{{ weather.humidity }}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Viento:</span>
            <span class="detail-value">{{ weather.windSpeed }} {{ weather.windSpeedUnit }}</span>
          </div>
        </div>
        <p class="timestamp" *ngIf="showTimestamp">
          Actualizado: {{ weather.timestamp | date:'short' }}
        </p>
      </div>
      <div class="location-info" *ngIf="cityName">
        <h3 class="city-name">{{ cityName }}</h3>
        <p class="country-name" *ngIf="countryName">{{ countryName }}</p>
      </div>
    </div>
  `,
  styles: [`
    .weather-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 2rem;
      color: white;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      margin: 0 auto;
    }

    .weather-icon {
      font-size: 4rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .weather-info {
      text-align: center;
    }

    .temperature {
      font-size: 3rem;
      margin: 0.5rem 0;
      font-weight: 300;
    }

    .description {
      font-size: 1.2rem;
      margin: 0.5rem 0;
      opacity: 0.9;
    }

    .details {
      display: flex;
      justify-content: space-around;
      margin: 1.5rem 0;
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-label {
      font-size: 0.85rem;
      opacity: 0.8;
    }

    .detail-value {
      font-size: 1.1rem;
      font-weight: 500;
    }

    .timestamp {
      font-size: 0.8rem;
      opacity: 0.7;
      margin-top: 1rem;
    }

    .location-info {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      text-align: center;
    }

    .city-name {
      font-size: 1.5rem;
      margin: 0;
      font-weight: 500;
    }

    .country-name {
      font-size: 1rem;
      margin: 0.5rem 0 0 0;
      opacity: 0.8;
    }
  `]
})
export class WeatherCardComponent {
  @Input() weather: WeatherData | null = null;
  @Input() cityName?: string;
  @Input() countryName?: string;
  @Input() showTimestamp: boolean = true;

  constructor(private weatherMapper: WeatherMapper) {}

  getWeatherIcon(): string {
    return this.weather
      ? this.weatherMapper.getWeatherIcon(this.weather.weatherCode)
      : '🌡️';
  }
}
