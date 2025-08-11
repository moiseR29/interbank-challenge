export enum STATUS_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
}

interface ErrorMetadata {
  name?: string;
  message?: string;
  status?: STATUS_CODE;
}

export class MainError extends Error {
  private statusCode: STATUS_CODE;

  constructor(name: string, message: string, status = STATUS_CODE.BAD_REQUEST) {
    super(message);
    this.name = name;
    this.statusCode = status;

    Object.setPrototypeOf(this, MainError.prototype);
  }

  static check(error: any, errorMetadata: ErrorMetadata = {}): MainError {
    if (error instanceof MainError) return error;

    const {
      name = 'Generic Error',
      message = error.message,
      status = STATUS_CODE.BAD_REQUEST,
    } = errorMetadata;

    return new MainError(name, message, status);
  }

  getError() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
    };
  }
}
