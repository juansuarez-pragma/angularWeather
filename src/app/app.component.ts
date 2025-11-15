import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Root App Component
 * Contains navigation and router outlet
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">
            <span class="app-icon">🌤️</span>
            AngularWeather
          </h1>
          <nav class="app-nav">
            <a
              routerLink="/current"
              routerLinkActive="active"
              class="nav-link"
            >
              📍 Current
            </a>
            <a
              routerLink="/search"
              routerLinkActive="active"
              class="nav-link"
            >
              🔍 Search
            </a>
            <a
              routerLink="/history"
              routerLinkActive="active"
              class="nav-link"
            >
              📜 History
            </a>
          </nav>
        </div>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <p>
          Built with Angular {{ angularVersion }} |
          Data from <a href="https://open-meteo.com" target="_blank">Open-Meteo</a>
        </p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .app-header {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .app-title {
      margin: 0;
      color: #333;
      font-size: 1.8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .app-icon {
      font-size: 2rem;
    }

    .app-nav {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      color: #666;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .nav-link:hover {
      background-color: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    .nav-link.active {
      background-color: #667eea;
      color: white;
      border-color: #667eea;
    }

    .app-main {
      flex: 1;
      padding: 2rem 0;
    }

    .app-footer {
      background: rgba(0, 0, 0, 0.2);
      color: white;
      text-align: center;
      padding: 1.5rem;
      margin-top: auto;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.9rem;
    }

    .app-footer a {
      color: white;
      text-decoration: underline;
    }

    .app-footer a:hover {
      color: #ffd700;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        text-align: center;
      }

      .app-nav {
        flex-direction: column;
        width: 100%;
      }

      .nav-link {
        display: block;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {
  angularVersion = '17';
}
