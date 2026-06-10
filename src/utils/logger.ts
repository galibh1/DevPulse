// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
} as const;

// Log levels
export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

// Get color based on log level
const getColor = (level: LogLevel): string => {
  switch (level) {
    case LogLevel.DEBUG:
      return colors.gray;
    case LogLevel.INFO:
      return colors.blue;
    case LogLevel.WARN:
      return colors.yellow;
    case LogLevel.ERROR:
      return colors.red;
    case LogLevel.SUCCESS:
      return colors.green;
    default:
      return colors.reset;
  }
};

// Format timestamp
const getTimestamp = (): string => {
  return new Date().toISOString();
};

// Logger class
export class Logger {
  private static isDevelopment = process.env.NODE_ENV === "development";

  private static formatMessage(
    level: LogLevel,
    message: string,
    data?: any
  ): string {
    const timestamp = getTimestamp();
    const color = getColor(level);
    const baseMessage = `${color}[${timestamp}] [${level}]${colors.reset} ${message}`;

    if (data) {
      return `${baseMessage}\n${JSON.stringify(data, null, 2)}`;
    }
    return baseMessage;
  }

  static debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage(LogLevel.DEBUG, message, data));
    }
  }

  static info(message: string, data?: any): void {
    console.log(this.formatMessage(LogLevel.INFO, message, data));
  }

  static warn(message: string, data?: any): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, data));
  }

  static error(message: string, error?: any): void {
    console.error(this.formatMessage(LogLevel.ERROR, message, error));
  }

  static success(message: string, data?: any): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message, data));
  }

  // Request logging
  static logRequest(method: string, path: string, statusCode?: number): void {
    const status = statusCode ? ` → ${statusCode}` : "";
    this.info(`${method} ${path}${status}`);
  }

  // Database query logging
  static logQuery(query: string, params?: any[], duration?: number): void {
    const durationStr = duration ? ` (${duration}ms)` : "";
    if (this.isDevelopment) {
      this.debug(`Query: ${query}${durationStr}`, params);
    }
  }

  // Error with stack trace
  static errorWithStack(message: string, error: any): void {
    this.error(message, {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
  }

  // Auth event logging
  static logAuth(event: string, userId: number, email: string): void {
    this.info(`Auth Event: ${event}`, { userId, email });
  }

  // Issue event logging
  static logIssue(event: string, issueId: number, userId: number): void {
    this.info(`Issue Event: ${event}`, { issueId, userId });
  }
}

// Export default logger instance
export default Logger;