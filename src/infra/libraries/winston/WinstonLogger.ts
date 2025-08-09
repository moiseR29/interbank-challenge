import { v4 } from 'uuid';
import { Logger } from '@shared/core';
import { WinstonLoggerCreator, WinstonLoggerClient } from './winston';

export class WinstonLogger implements Logger {
  private logger: WinstonLoggerClient;
  private name: string;
  private tx: string;

  constructor(name: string) {
    this.logger = WinstonLoggerCreator.create();
    this.name = name;
    this.tx = v4();
  }

  log(message: string): void {
    this.logger.info(this.format(message));
  }

  info(message: string): void {
    this.logger.info(this.format(message));
  }

  warn(message: string): void {
    this.logger.warn(this.format(message));
  }

  error(message: string): void {
    this.logger.error(this.format(message));
  }

  private format(message: string): any {
    return {
      flowName: this.name,
      tx: this.tx,
      message,
    };
  }
}
