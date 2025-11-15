/**
 * Generic API Response wrapper for handling success/error states
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  isLoading: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Utility type for component state management
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
