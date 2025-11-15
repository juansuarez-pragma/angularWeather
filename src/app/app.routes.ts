import { Routes } from '@angular/router';

/**
 * Application Routes Configuration
 * Uses lazy loading for feature modules to optimize bundle size
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/current',
    pathMatch: 'full'
  },
  {
    path: 'current',
    loadChildren: () => import('./features/current-weather/current-weather.routes')
      .then(m => m.CURRENT_WEATHER_ROUTES)
  },
  {
    path: 'search',
    loadChildren: () => import('./features/search/search.routes')
      .then(m => m.SEARCH_ROUTES)
  },
  {
    path: 'history',
    loadChildren: () => import('./features/history/history.routes')
      .then(m => m.HISTORY_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/current'
  }
];
