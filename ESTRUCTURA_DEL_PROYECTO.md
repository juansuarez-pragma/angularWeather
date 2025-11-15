# AngularWeather - Estructura Completa del Proyecto

## Árbol de Directorios Completo

```
angular-weather/
│
├── src/
│   ├── app/
│   │   ├── core/                                    # CoreModule - Servicios Singleton
│   │   │   ├── services/
│   │   │   │   ├── weather.service.ts               # Servicio de API de clima
│   │   │   │   ├── weather.service.interface.ts     # Contrato del servicio (para DI)
│   │   │   │   ├── weather.service.mock.ts          # Mock para testing
│   │   │   │   ├── weather.service.spec.ts          # Tests unitarios
│   │   │   │   ├── location.service.ts              # Servicio de geolocalización
│   │   │   │   ├── location.service.mock.ts         # Mock para testing
│   │   │   │   ├── storage.service.ts               # Servicio de localStorage
│   │   │   │   └── storage.service.spec.ts          # Tests unitarios
│   │   │   ├── mappers/
│   │   │   │   └── weather.mapper.ts                # Mapper de DTO a Dominio
│   │   │   └── core.module.ts                       # Definición del módulo core
│   │   │
│   │   ├── shared/                                  # SharedModule - Componentes Reutilizables
│   │   │   ├── components/
│   │   │   │   ├── spinner/
│   │   │   │   │   └── spinner.component.ts         # Spinner de carga
│   │   │   │   ├── error-message/
│   │   │   │   │   └── error-message.component.ts   # Visualización de errores
│   │   │   │   └── weather-card/
│   │   │   │       └── weather-card.component.ts    # Tarjeta de datos de clima
│   │   │   └── shared.module.ts                     # Definición del módulo compartido
│   │   │
│   │   ├── features/                                # Módulos de Características (Lazy Loaded)
│   │   │   ├── current-weather/
│   │   │   │   ├── current-weather.component.ts     # Clima de ubicación actual
│   │   │   │   ├── current-weather.component.spec.ts # Tests unitarios
│   │   │   │   └── current-weather.routes.ts        # Routing de característica
│   │   │   ├── search/
│   │   │   │   ├── search.component.ts              # Búsqueda de ciudades
│   │   │   │   └── search.routes.ts                 # Routing de característica
│   │   │   └── history/
│   │   │       ├── history.component.ts             # Historial de búsquedas
│   │   │       └── history.routes.ts                # Routing de característica
│   │   │
│   │   ├── models/                                  # Modelos de Dominio y DTOs
│   │   │   ├── weather.model.ts                     # Modelos de dominio
│   │   │   ├── api-response.model.ts                # Tipos de respuesta de API
│   │   │   └── dtos/
│   │   │       └── open-meteo.dto.ts                # Definiciones de DTOs de API
│   │   │
│   │   ├── app.component.ts                         # Componente raíz
│   │   ├── app.routes.ts                            # Configuración de rutas de la app
│   │   └── app.config.ts                            # Configuración de la aplicación
│   │
│   ├── environments/
│   │   ├── environment.ts                           # Entorno de desarrollo
│   │   └── environment.prod.ts                      # Entorno de producción
│   │
│   ├── assets/                                      # Recursos estáticos
│   ├── index.html                                   # HTML principal
│   ├── main.ts                                      # Bootstrap de la aplicación
│   └── styles.scss                                  # Estilos globales
│
├── angular.json                                     # Configuración de Angular CLI
├── package.json                                     # Dependencias
├── tsconfig.json                                    # Configuración de TypeScript
├── tsconfig.app.json                                # Configuración de TypeScript para la app
├── tsconfig.spec.json                               # Configuración de TypeScript para tests
├── karma.conf.js                                    # Configuración del test runner
├── .gitignore                                       # Reglas de Git ignore
├── README.md                                        # Documentación del proyecto
├── ARQUITECTURA.md                                  # Documentación técnica de arquitectura
└── ESTRUCTURA_DEL_PROYECTO.md                       # Este archivo

```

## Conteo de Archivos por Categoría

### Servicios Core (8 archivos)
- `weather.service.ts` - 97 líneas
- `weather.service.interface.ts` - 24 líneas
- `weather.service.mock.ts` - 57 líneas
- `weather.service.spec.ts` - 123 líneas
- `location.service.ts` - 51 líneas
- `location.service.mock.ts` - 35 líneas
- `storage.service.ts` - 86 líneas
- `storage.service.spec.ts` - 164 líneas

### Componentes Compartidos (3 archivos)
- `spinner.component.ts` - 48 líneas
- `error-message.component.ts` - 52 líneas
- `weather-card.component.ts` - 157 líneas

### Componentes de Características (6 archivos)
- `current-weather.component.ts` - 175 líneas
- `current-weather.component.spec.ts` - 138 líneas
- `search.component.ts` - 214 líneas
- `history.component.ts` - 195 líneas
- Archivos de rutas (3) - ~20 líneas cada uno

### Modelos y DTOs (3 archivos)
- `weather.model.ts` - 35 líneas
- `api-response.model.ts` - 18 líneas
- `open-meteo.dto.ts` - 56 líneas

### Configuración (11 archivos)
- Archivos core de la app (app.component, routes, config, main) - ~250 líneas total
- Configuraciones de build (angular.json, tsconfig, karma) - ~400 líneas total
- Documentación (README, ARQUITECTURA, ESTRUCTURA) - ~800 líneas total

## Total de Líneas de Código

- **Código de Producción**: ~1,500 líneas
- **Código de Tests**: ~425 líneas
- **Configuración**: ~400 líneas
- **Documentación**: ~800 líneas
- **Total**: ~3,125 líneas

## Decisiones Arquitectónicas Clave

### 1. Arquitectura Modular
- **CoreModule**: Servicios singleton importados una sola vez
- **SharedModule**: Componentes de UI reutilizables
- **Feature Modules**: Carga diferida para mejor rendimiento

### 2. Inyección de Dependencias
- InjectionToken para contratos de servicios
- Fácil mocking en tests
- Acoplamiento débil entre capas

### 3. Diseño Guiado por el Dominio
- Separación clara de DTOs y modelos de dominio
- Patrón Mapper para transformación
- Lógica de negocio en servicios, no en componentes

### 4. Programación Reactiva
- RxJS para operaciones asíncronas
- Angular Signals para gestión de estado
- Flujo de datos basado en Observables

### 5. Type Safety
- Modo estricto de TypeScript
- Diseño enfocado en interfaces
- Sin tipos 'any'

### 6. Testabilidad
- Todos los servicios tienen implementaciones mock
- Configuración de TestBed para testing de Angular
- 100% de dependencias mockables

## Diagrama de Flujo de Datos

```
┌─────────────┐
│  Navegador  │
│Geolocaliza- │
│    ción     │
└──────┬──────┘
       │
       v
┌─────────────────┐
│ LocationService │
└──────┬──────────┘
       │
       v
┌──────────────────┐       ┌─────────────┐
│ WeatherComponent │──────>│ HttpClient  │
└──────┬───────────┘       └──────┬──────┘
       │                          │
       v                          v
┌──────────────────┐       ┌─────────────┐
│ WeatherService   │<──────│ Open-Meteo  │
└──────┬───────────┘       │     API     │
       │                   └─────────────┘
       v
┌──────────────────┐
│ WeatherMapper    │ (DTO → Modelo de Dominio)
└──────┬───────────┘
       │
       v
┌──────────────────┐
│ Component State  │ (Signals)
└──────────────────┘
```

## Flujo de Estado del Componente

```typescript
// Ejemplo de gestión de estado en CurrentWeatherComponent

loadingState = signal<LoadingState>('idle');  // 'idle' | 'loading' | 'success' | 'error'
weatherData = signal<WeatherData | null>(null);
errorMessage = signal<string>('');

// Signals computados
isLoading = computed(() => this.loadingState() === 'loading');
hasError = computed(() => this.loadingState() === 'error');

// Transiciones de estado:
// idle → loading → success (con datos)
// idle → loading → error (con mensaje)
```

## Integración con API

### Petición de Datos de Clima
```
GET https://api.open-meteo.com/v1/forecast
  ?latitude=51.5074
  &longitude=-0.1278
  &current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m
  &timezone=auto

Respuesta (DTO) → WeatherMapper → Modelo de Dominio
```

### Petición de Búsqueda de Ciudad
```
GET https://geocoding-api.open-meteo.com/v1/search
  ?name=London
  &count=1
  &language=en
  &format=json

Respuesta (DTO) → WeatherMapper → Modelo de Location
```

## Estrategia de Testing

### Cobertura de Tests Unitarios
- ✅ Servicios: Mocking de HTTP con HttpTestingController
- ✅ Componentes: Transiciones de estado e interacciones de usuario
- ✅ Mappers: Transformaciones de DTO a Dominio
- ✅ Storage: Operaciones de localStorage

### Servicios Mock
```typescript
// Ejemplo: MockWeatherService
class MockWeatherService implements IWeatherService {
  getCurrentWeather(location: Location): Observable<WeatherData> {
    return of(mockWeatherData);
  }
}

// Uso en tests
TestBed.configureTestingModule({
  providers: [
    { provide: WeatherService, useClass: MockWeatherService }
  ]
});
```

## Build y Despliegue

### Desarrollo
```bash
npm install          # Instalar dependencias
npm start           # Ejecutar servidor de desarrollo (localhost:4200)
npm test            # Ejecutar tests unitarios
```

### Producción
```bash
npm run build       # Build para producción (dist/)
ng test --coverage  # Generar reporte de cobertura
```

### Tamaño de Bundle (Estimado)
- Bundle principal: ~300 KB
- Chunks lazy: ~50 KB cada uno
- Total (gzipped): ~150 KB

## Compatibilidad de Navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

**Requisitos**: Soporte de Geolocation API

## Optimizaciones de Rendimiento

1. **Lazy Loading**: Módulos de características cargados bajo demanda
2. **OnPush Change Detection**: (mejora futura)
3. **Tree Shaking**: Código no utilizado eliminado en build de producción
4. **AOT Compilation**: Compilación anticipada en producción
5. **Code Splitting**: Bundles separados por ruta

## Consideraciones de Seguridad

1. **Sin API Keys**: Uso de API gratuita de Open-Meteo
2. **Sin Datos Sensibles**: Solo se almacenan datos meteorológicos
3. **localStorage**: Solo almacena historial de búsquedas no sensible
4. **HTTPS**: Todas las llamadas a API usan HTTPS
5. **CSP**: (mejora futura) Headers de Content Security Policy

## Accesibilidad (A11y)

Actual:
- HTML semántico
- Navegación por teclado
- Etiquetas ARIA (mejora futura)

Mejoras futuras:
- Pruebas con lectores de pantalla
- Conformidad WCAG 2.1 AA
- Gestión de foco

## Arquitectura de Capas

```
┌─────────────────────────────────────────────────┐
│           Capa de Presentación (UI)             │
│  ┌──────────────────────────────────────────┐   │
│  │     Componentes (Standalone)             │   │
│  │  - current-weather.component             │   │
│  │  - search.component                      │   │
│  │  - history.component                     │   │
│  └───────────────┬──────────────────────────┘   │
└──────────────────┼──────────────────────────────┘
                   │
                   ↓ (Signals, RxJS)
┌──────────────────────────────────────────────────┐
│         Capa de Lógica de Negocio                │
│  ┌──────────────────────────────────────────┐   │
│  │          Servicios                       │   │
│  │  - WeatherService (llamadas API)         │   │
│  │  - LocationService (Geolocalización)     │   │
│  │  - StorageService (localStorage)         │   │
│  └───────────────┬──────────────────────────┘   │
└──────────────────┼──────────────────────────────┘
                   │
                   ↓ (DTOs)
┌──────────────────────────────────────────────────┐
│            Capa de Datos                         │
│  ┌──────────────────────────────────────────┐   │
│  │     Mappers y Repositorios               │   │
│  │  - WeatherMapper (DTO → Dominio)         │   │
│  │  - HttpClient (Angular)                  │   │
│  └───────────────┬──────────────────────────┘   │
└──────────────────┼──────────────────────────────┘
                   │
                   ↓ (HTTP)
┌──────────────────────────────────────────────────┐
│          Servicios Externos                      │
│  - API Open-Meteo                                │
│  - API de Geolocalización del Navegador          │
│  - localStorage                                  │
└──────────────────────────────────────────────────┘
```

## Preparación para Escalabilidad

### Migración a NgRx (Futuro)
La estructura actual está preparada para evolucionar:

```typescript
// Actual: Servicio
weatherService.getCurrentWeather()

// Futuro: NgRx
store.dispatch(loadWeather({ location }))
```

### Microfrontends
Los módulos ya están aislados, fácil de extraer:

```
current-weather/ → Microfrontend 1
search/         → Microfrontend 2
history/        → Microfrontend 3
```

### API Gateway
Abstracción preparada para cambios:

```typescript
// Actual: Open-Meteo directo
weatherService.getCurrentWeather()

// Futuro: API Gateway
weatherService.getCurrentWeather() // ← Sin cambios en componente
  → Gateway → Múltiples APIs de clima
```

## Patrones de Diseño Utilizados

### 1. Repository Pattern
```typescript
export class WeatherService {
  // Repository para datos de clima
  getCurrentWeather(location: Location): Observable<WeatherData> {
    return this.http.get<DTO>(this.API_URL, { params })
      .pipe(
        map(dto => this.mapper.fromDTO(dto)),
        catchError(this.handleError)
      );
  }
}
```

### 2. Mapper Pattern
```typescript
// Separación DTO vs Modelo de Dominio
@Injectable({ providedIn: 'root' })
export class WeatherMapper {
  fromOpenMeteoDTO(dto: OpenMeteoCurrentWeatherDTO): WeatherData {
    return {
      temperature: dto.current.temperature_2m,
      weatherDescription: this.getWeatherDescription(dto.current.weather_code)
    };
  }
}
```

### 3. Dependency Injection Pattern
```typescript
// Interfaz + InjectionToken para testabilidad
export const WEATHER_SERVICE_TOKEN = new InjectionToken<IWeatherService>('WeatherService');

// En tests
TestBed.configureTestingModule({
  providers: [
    { provide: WEATHER_SERVICE_TOKEN, useClass: MockWeatherService }
  ]
});
```

### 4. Observer Pattern (RxJS)
```typescript
// Observable para operaciones asíncronas
this.weatherService.getCurrentWeather(location)
  .pipe(
    switchMap(weather => this.processWeather(weather)),
    catchError(error => this.handleError(error))
  )
  .subscribe(result => this.updateUI(result));
```

### 5. Facade Pattern
```typescript
// Componente como fachada que orquesta servicios
export class CurrentWeatherComponent {
  loadCurrentWeather(): void {
    this.locationService.getCurrentLocation()
      .pipe(
        switchMap(location => this.weatherService.getCurrentWeather(location))
      )
      .subscribe(weather => this.weatherData.set(weather));
  }
}
```

## Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase con sufijo `.component.ts`
- **Servicios**: PascalCase con sufijo `.service.ts`
- **Interfaces**: PascalCase con prefijo `I` (ej: `IWeatherService`)
- **DTOs**: PascalCase con sufijo `DTO`
- **Modelos**: PascalCase sin sufijo
- **Constantes**: SCREAMING_SNAKE_CASE
- **Variables**: camelCase

### Organización de Importaciones
```typescript
// 1. Angular core
import { Component, OnInit } from '@angular/core';

// 2. Angular módulos
import { CommonModule } from '@angular/common';

// 3. RxJS
import { Observable } from 'rxjs';

// 4. Módulos de la aplicación
import { WeatherService } from '@core/services/weather.service';
import { WeatherData } from '@models/weather.model';
```

### Comentarios JSDoc
```typescript
/**
 * Obtiene el clima actual para una ubicación específica
 * @param location Coordenadas geográficas
 * @returns Observable de WeatherData
 */
getCurrentWeather(location: Location): Observable<WeatherData> {
  // Implementación
}
```

## Conclusión

Esta estructura proporciona:

✅ **Mantenibilidad**: Código organizado y bien estructurado
✅ **Escalabilidad**: Fácil de extender con nuevas características
✅ **Testabilidad**: Alta cobertura de tests posible
✅ **Rendimiento**: Optimizado con lazy loading y AOT
✅ **Type Safety**: TypeScript estricto en todo el proyecto
✅ **Documentación**: Código autodocumentado con comentarios claros

El proyecto está diseñado para crecer desde un MVP hasta una aplicación empresarial completa, manteniendo la calidad del código y las mejores prácticas en cada etapa.
