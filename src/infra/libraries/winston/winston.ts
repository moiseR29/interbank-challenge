import {
  createLogger,
  format,
  transports,
  Logger as WinstonLoggerClient,
  transport as WinstonTransport,
} from 'winston';

const { combine, timestamp, printf } = format;

export { WinstonLoggerClient };

const customFormat = printf(({ message, timestamp, ...rest }: any) => {
  const { flowName, tx } = rest;
  return `${tx} | ${flowName} | ${timestamp} | ${message}`;
});

export class WinstonLoggerCreator {
  static create(): WinstonLoggerClient {
    const transportArray: Array<WinstonTransport> = [
      new transports.Console({
        format: combine(
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.json(),
          customFormat,
        ),
      }),
    ];

    return createLogger({
      transports: transportArray,
      level: 'info',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
      ),
    });
  }
}
