export class Value<T> {
  protected _value: T;

  constructor(value: any) {
    this._value = value;
    this.isNotNullOrUnd();
  }

  get value(): T {
    return this._value;
  }

  protected isNotNullOrUnd() {
    if (this.value === undefined || this.value === null) {
      throw new Error('Value is undefined or null ( it is not valid )');
    }
  }
}
