# AngularWeather - MVP Nivel Senior

Una aplicación moderna de clima construida con Angular 17, demostrando arquitectura de nivel empresarial y mejores prácticas de desarrollo.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación Adicional](#documentación-adicional)

## Características

### Funcionalidades Principales

- **🌍 Clima Actual**: Obtiene el clima de tu ubicación actual usando la API de Geolocalización del navegador
- **🔍 Búsqueda de Ciudades**: Busca el clima de cualquier ciudad del mundo
- **📜 Historial de Búsquedas**: Visualiza tus búsquedas recientes (almacenadas en localStorage)
- **📱 Diseño Responsive**: Interfaz hermosa que funciona en todos los dispositivos
- **⚡ Carga Rápida**: Lazy loading de módulos para optimizar el rendimiento
- **🎨 UI Moderna**: Diseño con gradientes y animaciones suaves

### Características Técnicas

- **Type-Safe**: Implementación completa en TypeScript con modo estricto
- **Testable**: Tests unitarios exhaustivos con mocks
- **Escalable**: Arquitectura modular preparada para crecer
- **Mantenible**: Código limpio siguiendo principios SOLID
- **Reactivo**: Programación reactiva con RxJS y Signals

## Tecnologías Utilizadas

### Framework y Lenguaje

- **Angular 17.3**: Framework principal
- **TypeScript 5.4**: Lenguaje de programación con tipado estático
- **RxJS 7.8**: Programación reactiva
- **SCSS**: Preprocesador CSS

### Testing

- **Jasmine**: Framework de testing
- **Karma**: Test runner

### API

- **Open-Meteo API**: API gratuita de clima (sin clave requerida)
  - Weather API: Datos meteorológicos
  - Geocoding API: Conversión de nombres de ciudades a coordenadas

### Herramientas de Desarrollo

- **Angular CLI**: Herramientas de línea de comandos
- **npm**: Gestor de paquetes

## Arquitectura

El proyecto implementa una **Arquitectura Modular Limpia** con separación clara de responsabilidades:

### Módulos Principales

```
src/app/
├── core/          # Servicios singleton (una sola instancia)
├── shared/        # Componentes reutilizables
├── features/      # Módulos de características (lazy loaded)
└── models/        # Modelos de dominio y DTOs
```

### Patrones de Diseño Implementados

1. **Inyección de Dependencias**: Sistema DI de Angular con InjectionTokens
2. **Patrón DTO**: Separación entre modelos de API y modelos de dominio
3. **Mapper Pattern**: Transformación de datos entre capas
4. **Observable Pattern**: RxJS para operaciones asíncronas
5. **Signals**: Gestión de estado reactiva (Angular 17)
6. **Repository Pattern**: Servicios como repositorios de datos

### Principios SOLID

- ✅ **Single Responsibility**: Cada clase tiene una única responsabilidad
- ✅ **Open/Closed**: Abierto para extensión, cerrado para modificación
- ✅ **Liskov Substitution**: Las implementaciones pueden sustituirse
- ✅ **Interface Segregation**: Interfaces específicas (IWeatherService)
- ✅ **Dependency Inversion**: Dependencia de abstracciones, no concreciones

Para más detalles, consulta [ARQUITECTURA.md](./ARQUITECTURA.md)

## Instalación

### Requisitos Previos

- **Node.js** 18+ y npm
- **Angular CLI** 17+ (opcional, se puede usar con npx)

### Pasos de Instalación

1. **Clonar el repositorio**:
```bash
git clone <url-del-repositorio>
cd angular
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Instalar Angular CLI globalmente** (opcional):
```bash
npm install -g @angular/cli@17
```

## Ejecución

### Servidor de Desarrollo

```bash
npm start
# o
ng serve
```

Navega a `http://localhost:4200/` en tu navegador.

La aplicación se recargará automáticamente si cambias algún archivo fuente.

### Build de Producción

```bash
npm run build
# o
ng build
```

Los archivos compilados se guardarán en el directorio `dist/`.

### Opciones de Build

```bash
# Build de producción optimizado
ng build --configuration production

# Build con análisis de bundle
ng build --stats-json
```

## Testing

### Ejecutar Tests Unitarios

```bash
npm test
# o
ng test
```

### Ejecutar Tests con Cobertura

```bash
ng test --code-coverage
```

El reporte de cobertura se generará en `coverage/angular-weather/`.

### Ver Reporte de Cobertura

```bash
# Abrir el reporte HTML
open coverage/angular-weather/index.html
```

### Estructura de Tests

- **Component Tests**: Verifican estados, ciclo de vida e interacciones
- **Service Tests**: Verifican peticiones HTTP y manejo de errores
- **Storage Tests**: Verifican operaciones de localStorage

Ejemplo de test:
```typescript
it('debe cambiar de loading a success cuando se obtienen datos', (done) => {
  component.ngOnInit();
  expect(component.loadingState()).toBe('loading');

  setTimeout(() => {
    expect(component.loadingState()).toBe('success');
    expect(component.weatherData()).not.toBeNull();
    done();
  }, 100);
});
```

## Estructura del Proyecto

```
angular-weather/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios singleton
│   │   │   ├── services/
│   │   │   │   ├── weather.service.ts
│   │   │   │   ├── location.service.ts
│   │   │   │   └── storage.service.ts
│   │   │   └── mappers/
│   │   │       └── weather.mapper.ts
│   │   │
│   │   ├── shared/                  # Componentes reutilizables
│   │   │   └── components/
│   │   │       ├── spinner/
│   │   │       ├── error-message/
│   │   │       └── weather-card/
│   │   │
│   │   ├── features/                # Módulos de características
│   │   │   ├── current-weather/
│   │   │   ├── search/
│   │   │   └── history/
│   │   │
│   │   └── models/                  # Modelos y DTOs
│   │       ├── weather.model.ts
│   │       ├── api-response.model.ts
│   │       └── dtos/
│   │
│   ├── environments/                # Configuraciones de entorno
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── angular.json                     # Configuración de Angular CLI
├── package.json                     # Dependencias del proyecto
├── tsconfig.json                    # Configuración de TypeScript
└── karma.conf.js                    # Configuración de tests
```

## Flujo de Datos

```
Usuario → Componente → Servicio → HTTP → API Externa
                ↓         ↓
            Signals    Mapper (DTO → Modelo)
                ↓
            Template (Renderizado)
```

## Gestión de Estado

El proyecto utiliza **Angular Signals** para gestión de estado reactiva:

```typescript
// Estado del componente
loadingState = signal<LoadingState>('idle');
weatherData = signal<WeatherData | null>(null);
errorMessage = signal<string>('');

// Signals computados
isLoading = computed(() => this.loadingState() === 'loading');
```

### Estados de la Aplicación

- `idle`: Estado inicial
- `loading`: Cargando datos
- `success`: Datos cargados exitosamente
- `error`: Error en la carga de datos

## Integración con API

### Open-Meteo API

La aplicación utiliza la API gratuita de Open-Meteo (sin clave requerida):

**Weather API**:
```
GET https://api.open-meteo.com/v1/forecast
  ?latitude=51.5074
  &longitude=-0.1278
  &current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m
  &timezone=auto
```

**Geocoding API**:
```
GET https://geocoding-api.open-meteo.com/v1/search
  ?name=London
  &count=1
  &language=en
```

## Mejores Prácticas Implementadas

### Código Limpio

- ✅ Nombres descriptivos y autoexplicativos
- ✅ Funciones pequeñas con responsabilidad única
- ✅ Comentarios JSDoc en interfaces públicas
- ✅ Constantes en lugar de valores mágicos
- ✅ Manejo centralizado de errores

### TypeScript

- ✅ Modo estricto activado
- ✅ Sin uso de `any`
- ✅ Interfaces para todos los modelos
- ✅ Tipos genéricos donde corresponde
- ✅ Path aliases configurados

### Angular

- ✅ Standalone Components (Angular 17)
- ✅ Lazy loading de módulos
- ✅ Signals para estado reactivo
- ✅ OnPush change detection ready
- ✅ Inyección de dependencias con tokens

### Testing

- ✅ Tests aislados con mocks
- ✅ Arrange-Act-Assert pattern
- ✅ Tests descriptivos
- ✅ Alta cobertura de código
- ✅ Tests de integración para servicios

## Seguridad

- ✅ No se requieren claves API
- ✅ Todas las peticiones usan HTTPS
- ✅ No se almacenan datos sensibles
- ✅ localStorage solo para historial de búsquedas
- ✅ Validación de formularios

## Rendimiento

### Optimizaciones Implementadas

- **Lazy Loading**: Módulos cargados bajo demanda
- **Tree Shaking**: Eliminación de código no utilizado
- **AOT Compilation**: Compilación anticipada en producción
- **Code Splitting**: Bundles separados por ruta
- **Minificación**: Código minificado en producción

### Tamaño de Bundle (Estimado)

- Main bundle: ~300 KB
- Lazy chunks: ~50 KB cada uno
- Total (gzipped): ~150 KB

## Accesibilidad

- ✅ HTML semántico
- ✅ Navegación por teclado
- 🔄 Etiquetas ARIA (mejora futura)
- 🔄 Pruebas con lectores de pantalla (mejora futura)
- 🔄 Conformidad WCAG 2.1 AA (mejora futura)

## Compatibilidad de Navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

**Requisito**: Soporte de Geolocation API

## Documentación Adicional

- [ARQUITECTURA.md](./ARQUITECTURA.md) - Documentación técnica detallada de la arquitectura
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Estructura completa del proyecto

## Mejoras Futuras

### Funcionalidades

- [ ] Pronóstico extendido (7 días)
- [ ] Múltiples ubicaciones favoritas
- [ ] Alertas meteorológicas
- [ ] Notificaciones push
- [ ] Gráficos de tendencias
- [ ] Conversión de unidades (Celsius/Fahrenheit)
- [ ] Temas (modo oscuro/claro)

### Técnicas

- [ ] PWA (Progressive Web App)
- [ ] Service Workers para cache
- [ ] Gestión de estado con NgRx Signal Store
- [ ] Internacionalización (i18n)
- [ ] SSR (Server-Side Rendering)
- [ ] Animaciones avanzadas
- [ ] Optimización de imágenes

## Contribución

Este proyecto es educativo y está abierto a mejoras. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autor

Desarrollado como proyecto educativo demostrando mejores prácticas de Angular nivel Senior.

## Agradecimientos

- [Angular Team](https://angular.io/) - Por el excelente framework
- [Open-Meteo](https://open-meteo.com/) - Por la API gratuita de clima
- Comunidad de Angular - Por las mejores prácticas y patrones

---

**¿Preguntas?** Abre un issue en el repositorio.

**¿Te gustó?** Dale una ⭐ al repositorio.
