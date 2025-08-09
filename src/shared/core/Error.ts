export enum STATUS_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
}

export class MainError extends Error {
  private statusCode: STATUS_CODE;

  constructor(name: string, message: string, status = STATUS_CODE.BAD_REQUEST) {
    super(message);
    this.name = name;
    this.statusCode = status;

    Object.setPrototypeOf(this, MainError.prototype);
  }

  static check(error: any): MainError {
    if (error instanceof MainError) return error;

    return new MainError(
      'Generic Error',
      error.message,
      STATUS_CODE.BAD_REQUEST,
    );
  }

  getError() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      name: this.name,
    };
  }
}
