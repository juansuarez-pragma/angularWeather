import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { StorageService } from '@core/services/storage.service';
import { SearchHistory } from '@models/weather.model';

/**
 * History Component
 * Displays search history from localStorage
 */
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="history-container">
      <h1 class="page-title">Historial de Búsquedas</h1>
      <p class="page-subtitle">Tus búsquedas recientes de clima</p>

      <!-- Empty State -->
      <div *ngIf="isEmpty()" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>Sin Historial de Búsquedas</h3>
        <p>Busca una ciudad para verla aparecer aquí</p>
      </div>

      <!-- History List -->
      <div *ngIf="!isEmpty()" class="history-content">
        <div class="history-actions">
          <button class="clear-button" (click)="clearAllHistory()">
            🗑️ Limpiar Todo el Historial
          </button>
        </div>

        <div class="history-list">
          <div
            *ngFor="let item of historyItems()"
            class="history-item"
          >
            <div class="history-card">
              <button
                class="delete-button"
                (click)="deleteItem(item.id)"
                title="Eliminar del historial"
              >
                ✕
              </button>

              <div class="history-header">
                <h3 class="city-name">{{ item.cityName }}</h3>
                <span class="searched-date">
                  {{ item.searchedAt | date:'short' }}
                </span>
              </div>

              <app-weather-card
                [weather]="item.weather"
                [showTimestamp]="false"
              ></app-weather-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .history-container {
      padding: 2rem;
      max-width: 800px;
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

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #999;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      margin: 1rem 0 0.5rem 0;
      color: #666;
    }

    .empty-state p {
      margin: 0;
    }

    .history-content {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .history-actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1.5rem;
    }

    .clear-button {
      padding: 0.5rem 1rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .clear-button:hover {
      background-color: #d32f2f;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
    }

    .history-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .history-item {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .history-card {
      position: relative;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .history-card:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .delete-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 30px;
      height: 30px;
      background-color: rgba(244, 67, 54, 0.9);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .delete-button:hover {
      background-color: #d32f2f;
      transform: scale(1.1);
    }

    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-right: 2rem;
    }

    .city-name {
      margin: 0;
      color: #333;
      font-size: 1.3rem;
    }

    .searched-date {
      color: #999;
      font-size: 0.85rem;
    }
  `]
})
export class HistoryComponent implements OnInit {
  // Signals for reactive state management
  historyItems = signal<SearchHistory[]>([]);

  // Computed signals
  isEmpty = computed(() => this.historyItems().length === 0);

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  /**
   * Loads history from localStorage
   */
  loadHistory(): void {
    const history = this.storageService.getHistory();
    this.historyItems.set(history);
  }

  /**
   * Clears all history
   */
  clearAllHistory(): void {
    if (confirm('¿Estás seguro de que quieres limpiar todo el historial de búsquedas?')) {
      this.storageService.clearHistory();
      this.historyItems.set([]);
    }
  }

  /**
   * Deletes a single history item
   */
  deleteItem(id: string): void {
    this.storageService.removeFromHistory(id);
    this.loadHistory();
  }
}
