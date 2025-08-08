export abstract class MainError extends Error {
  constructor(name: string, message: string) {
    super(message);

    Object.setPrototypeOf(this, MainError.prototype);
  }
}
