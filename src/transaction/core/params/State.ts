import { StringValue } from '@shared/core';
import { TransactionError } from '../Error';

export enum TRANSACTION_STATE {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class State extends StringValue {
  constructor(value: string) {
    super(value);
    this.isValid();
  }

  static default(): State {
    return new State(TRANSACTION_STATE.SUCCESS);
  }

  private isValid() {
    if (
      ![TRANSACTION_STATE.SUCCESS, TRANSACTION_STATE.FAILED].includes(
        this._value as TRANSACTION_STATE,
      )
    ) {
      throw new InvalidState('Invalid state, only allowed Success and Failed');
    }
  }
}

class InvalidState extends TransactionError {
  constructor(message: string) {
    super(message, 'Transaction State Error');
  }
}
