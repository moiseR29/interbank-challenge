import { IDontKnow } from './Types';

type LoggerTypeMessage = string | IDontKnow;

export interface Logger {
  // in my useCase, allow only message, but meta is a good choice
  //log(message: LoggerTypeMessage, ...meta: Array<LoggerTypeMessage>): void;
  log(message: LoggerTypeMessage): void;
  info(message: LoggerTypeMessage): void;
  warn(message: LoggerTypeMessage): void;
  error(message: LoggerTypeMessage): void;
}
