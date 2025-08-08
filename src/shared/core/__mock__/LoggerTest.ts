import { Logger } from '../Logger';

export class TestLogger implements Logger {
  log(message: any): void {
    throw new Error('Method not implemented.');
  }
  info(message: any): void {
    throw new Error('Method not implemented.');
  }
  warn(message: any): void {
    throw new Error('Method not implemented.');
  }
  error(message: any): void {
    throw new Error('Method not implemented.');
  }
}
