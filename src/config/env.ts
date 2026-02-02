// Helper untuk membaca environment variables
// Mendukung "Runtime Configuration" (window._env_) dan "Build-time" (import.meta.env)

// Definisi tipe untuk window object agar TypeScript tidak complain
declare global {
  interface Window {
    _env_?: Record<string, string>;
  }
}

/**
 * Mendapatkan nilai environment variable.
 * Prioritas:
 * 1. window._env_ (Runtime - diset oleh docker-entrypoint.sh)
 * 2. import.meta.env (Build-time - diset oleh Vite)
 *
 * @param key Nama variable (misal: "VITE_API_URL")
 * @returns Nilai variable atau undefined
 */
export function getEnv(key: string): string | undefined {
  // Cek runtime env dulu (dari browser window)
  if (window._env_ && window._env_[key]) {
    return window._env_[key];
  }

  // Fallback ke build-time env (Vite)
  return import.meta.env[key];
}
