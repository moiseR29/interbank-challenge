import _ from 'lodash';

export class Generator {
  static numbersLength(length: number): number {
    return Number(_.sampleSize('0123456789', length).join(''));
  }
}
