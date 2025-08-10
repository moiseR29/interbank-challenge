import { NumberValue } from '@shared/core';

export class Amount extends NumberValue {
  isPositive(): boolean {
    return this._value >= 0;
  }
}
