export enum LogLevel {
  Debug = 'Debug',
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error',
}

const LOG_LEVEL_ORDER = {
  [LogLevel.Debug]: 0,
  [LogLevel.Info]: 1,
  [LogLevel.Warn]: 2,
  [LogLevel.Error]: 3,
} as const;

const LOG_CHAR = {
  [LogLevel.Debug]: '🐞',
  [LogLevel.Info]: 'ℹ️',
  [LogLevel.Warn]: '⚠️',
  [LogLevel.Error]: '🚨',
} as const;

const LOG_LEVEL_STYLES = {
  [LogLevel.Debug]: ['color: #666', 'background-color: #fff'].join(';'),
  [LogLevel.Info]: ['color: #386da5', 'background-color: #fff'].join(';'),
  [LogLevel.Warn]: ['color: #efd61a', 'background-color: #fff'].join(';'),
  [LogLevel.Error]: ['color: #ef1a41', 'background-color: #fff'].join(';'),
} as const;

function shouldLog(minLogLevel: LogLevel | undefined | null, logLevel: LogLevel) {
  if (minLogLevel === undefined) {
    return true;
  }

  if (minLogLevel === null) {
    return false;
  }

  return LOG_LEVEL_ORDER[logLevel] >= LOG_LEVEL_ORDER[minLogLevel];
}

const LOG_SOURCE_STYLE = [
  'color: #333',
  'background-color: #eee',
  'padding: 2px',
  'border-radius: 3px',
  'font-weight: 600',
].join(';');

const LOG_BASE_STYLE = ['color: #333', 'background-color: #fff'].join(';');

export class Logger {
  logLevel: LogLevel = LogLevel.Debug;

  source: string;
  allSources: string;
  children: Logger[] = [];

  constructor(source: string = 'unknown', logLevel?: LogLevel, parent?: Logger) {
    this.logLevel = logLevel ? logLevel : this.logLevel;
    this.source = source;
    this.allSources = parent ? `${parent.allSources} ${source}` : source;
  }

  setLogLevel(level: LogLevel, propigate: boolean = false): Logger {
    this.logLevel = level;
    if (propigate) {
      this.children.forEach(logger => logger.setLogLevel(level, true));
    }
    return this;
  }

  out(message: string, logLevel = LogLevel.Info) {
    if (shouldLog(this.logLevel, logLevel)) {
      console.log(
        `%c${LOG_CHAR[logLevel]}[${this.allSources}]%c %c${message}`,
        LOG_SOURCE_STYLE,
        LOG_BASE_STYLE,
        LOG_LEVEL_STYLES[logLevel],
      );
    }
  }

  createClient(source: string, logLevel?: LogLevel): Logger {
    const logger = new Logger(source, logLevel ? logLevel : this.logLevel, this);
    this.children.push(logger);
    return logger;
  }

  log(message: string, logLevel = LogLevel.Info) {
    this.out(message, logLevel);
  }

  debug(message: string) {
    this.out(message, LogLevel.Debug);
  }

  warn(message: string) {
    this.out(message, LogLevel.Warn);
  }

  error(message: string) {
    this.out(message, LogLevel.Error);
  }
}
