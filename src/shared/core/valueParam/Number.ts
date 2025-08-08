import { Value } from './Value';

export class NumberValue extends Value<number> {
  constructor(value: number) {
    super(Number(value));
  }
}
