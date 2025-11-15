import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';

/**
 * SharedModule
 * Contains reusable components, directives, and pipes
 * Can be imported by feature modules
 */
@NgModule({
  imports: [
    CommonModule,
    SpinnerComponent,
    ErrorMessageComponent,
    WeatherCardComponent
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    ErrorMessageComponent,
    WeatherCardComponent
  ]
})
export class SharedModule {}
