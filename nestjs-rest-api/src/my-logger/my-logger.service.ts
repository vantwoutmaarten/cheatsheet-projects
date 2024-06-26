import { ConsoleLogger, Injectable } from '@nestjs/common';

import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(message: string) {
    await fsPromises.writeFile('log.txt', message);
  }

  log(message: any, context?: string) {
    const entry = context ? `[${context}] \t ${message}` : message;
    super.log(message, context);
    this.logToFile(entry);
  }
  error(message: string, stackOrContext: string) {
    const entry = stackOrContext
      ? `[${stackOrContext}] \t ${message}`
      : message;
    super.error(`MyLoggerService.error(): ${message}`, stackOrContext);
    this.logToFile(entry);
  }
  warn(message: string) {
    super.warn(`MyLoggerService.warn(): ${message}`);
  }
  debug(message: string) {
    super.debug(`MyLoggerService.debug(): ${message}`);
  }
  verbose(message: string) {
    super.verbose(`MyLoggerService.verbose(): ${message}`);
  }
}
