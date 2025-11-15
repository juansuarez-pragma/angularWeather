import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable Error Message Component
 * Displays error messages with consistent styling
 */
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container" *ngIf="message">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h3 class="error-title">{{ title }}</h3>
        <p class="error-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .error-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .error-content {
      flex: 1;
    }

    .error-title {
      margin: 0 0 0.5rem 0;
      color: #c33;
      font-size: 1rem;
      font-weight: 600;
    }

    .error-message {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() title: string = 'Error';
  @Input() message: string = '';
}
