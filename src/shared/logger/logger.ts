const PROD_MODE = process.env.NODE_ENV === "production"

export enum LOG_LEVEL {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export class Logger {
  private static logLevel: LOG_LEVEL = LOG_LEVEL.INFO

  static setLogLevel(level: LOG_LEVEL): void {
    Logger.logLevel = level
  }

  private static log(level: LOG_LEVEL, message: string): void {
    if (Logger.shouldLog(level)) {
      console.info(`[SERVER-${level}](${new Date().toLocaleString()}): ${message}`)
    }
  }

  static info(message: string): void {
    Logger.log(LOG_LEVEL.INFO, message)
  }

  static warn(message: string): void {
    Logger.log(LOG_LEVEL.WARN, message)
  }

  static error(message: string): void {
    Logger.log(LOG_LEVEL.ERROR, message)
  }

  private static shouldLog(level: LOG_LEVEL): boolean {
    const logLevelValues = Object.values(LOG_LEVEL) as string[]
    const currentLevelIndex = logLevelValues.indexOf(Logger.logLevel)
    const messageLevelIndex = logLevelValues.indexOf(level)

    return currentLevelIndex <= messageLevelIndex
  }
}
