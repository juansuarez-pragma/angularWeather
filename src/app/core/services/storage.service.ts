import { Injectable } from '@angular/core';
import { SearchHistory } from '@models/weather.model';

/**
 * Storage Service
 * Handles localStorage operations for search history
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'weather_search_history';
  private readonly MAX_HISTORY_ITEMS = 10;

  /**
   * Saves a search to history
   * @param history SearchHistory item to save
   */
  saveToHistory(history: SearchHistory): void {
    try {
      const currentHistory = this.getHistory();

      // Remove duplicates (same city)
      const filteredHistory = currentHistory.filter(
        item => item.cityName.toLowerCase() !== history.cityName.toLowerCase()
      );

      // Add new item at the beginning
      const updatedHistory = [history, ...filteredHistory].slice(0, this.MAX_HISTORY_ITEMS);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Retrieves all search history
   * @returns Array of SearchHistory items
   */
  getHistory(): SearchHistory[] {
    try {
      const historyJson = localStorage.getItem(this.STORAGE_KEY);
      if (!historyJson) {
        return [];
      }

      const history: SearchHistory[] = JSON.parse(historyJson);

      // Convert date strings back to Date objects
      return history.map(item => ({
        ...item,
        searchedAt: new Date(item.searchedAt),
        weather: {
          ...item.weather,
          timestamp: new Date(item.weather.timestamp)
        }
      }));
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Clears all search history
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Removes a specific item from history
   * @param id ID of the history item to remove
   */
  removeFromHistory(id: string): void {
    try {
      const currentHistory = this.getHistory();
      const updatedHistory = currentHistory.filter(item => item.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
}
