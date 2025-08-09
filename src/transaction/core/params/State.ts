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
      throw TransactionError.invalidState();
    }
  }
}
