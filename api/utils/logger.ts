import { Logger } from "../../src/utils/logger.js";

class ServerLogger implements Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';
  private isDebugMode = process.env.DEBUG === 'true';

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
    console.error(`[ERROR] ${message}`, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment && this.isDebugMode) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export const logger: Logger = new ServerLogger();