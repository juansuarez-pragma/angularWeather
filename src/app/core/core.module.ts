import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';
import { StorageService } from './services/storage.service';
import { WeatherMapper } from './mappers/weather.mapper';
import { WEATHER_SERVICE_TOKEN } from './services/weather.service.interface';

/**
 * CoreModule
 * Singleton services and app-wide dependencies
 * This module should only be imported once in AppModule
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WeatherService,
    LocationService,
    StorageService,
    WeatherMapper,
    // Provide concrete implementation for the interface token
    {
      provide: WEATHER_SERVICE_TOKEN,
      useClass: WeatherService
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule');
    }
  }
}
