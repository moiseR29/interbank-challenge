import { Value } from './Value';

export class BooleanValue extends Value<boolean> {
  constructor(value: boolean) {
    super(Boolean(value));
  }
}
