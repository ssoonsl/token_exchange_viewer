
export interface Logger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}

class ConsoleLogger implements Logger {
  private isDevelopment = import.meta.env.DEV;
  private isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'true';

  info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    // Always log errors, even in production
    console.error(`[ERROR] ${message}`, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment && this.isDebugMode) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export const logger: Logger = new ConsoleLogger();

export { ConsoleLogger };