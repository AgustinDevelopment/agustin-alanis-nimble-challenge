// Environment variables configuration and validation

/**
 * Validates that a required environment variable is set and is a valid URL
 */
function validateBaseUrl(value: string | undefined): string {
  if (!value) {
    throw new Error(
      'Missing environment variable: VITE_API_BASE_URL. Please check your .env file.'
    );
  }

  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(
      `Invalid URL format in VITE_API_BASE_URL: "${value}"`
    );
  }
}

export const config = Object.freeze({
  apiBaseUrl: validateBaseUrl(import.meta.env.VITE_API_BASE_URL),
});
