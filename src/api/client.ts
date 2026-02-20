import axios, { AxiosError } from 'axios';
import { config } from '../config/env';

/**
 * Custom API error with status code
 */
export class ApiError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Configured Axios instance for API calls
 */
export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - logs outgoing requests in development
 */
apiClient.interceptors.request.use(
  (requestConfig) => {
    if (import.meta.env.DEV) {
      console.debug(`[API] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - handles errors and extracts error messages
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'An unexpected error occurred';

    if (import.meta.env.DEV) {
      console.error('[API Error]', message);
    }

    return Promise.reject(
      new ApiError(message, error.response?.status)
    );
  }
);
