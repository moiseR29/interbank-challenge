import moment from 'moment-timezone';
import { Value } from './Value';

/**
 * @description use static methods ( NewFromUTC and newToUTC ) for use Date or string
 */
export class DateValue extends Value<moment.Moment> {
  constructor(value: moment.Moment) {
    super(value);
  }

  static new(): DateValue {
    return new DateValue(moment().utc());
  }

  static newFromUTC(date: Date | string): DateValue {
    return new DateValue(moment.utc(date));
  }

  static newToUTC(date: Date | string): DateValue {
    return new DateValue(moment(date).utc());
  }

  changeTz(tz: string) {
    this._value = this._value.tz(tz);
  }
}
