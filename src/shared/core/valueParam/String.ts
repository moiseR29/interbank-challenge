import { Value } from './Value';

export class StringValue extends Value<string> {
  constructor(value: string) {
    super(String(value));
  }
}
