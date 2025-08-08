import { IDontKnowObject } from '@shared/core';
import { AccountError } from './Error';
import { Amount, CreatedAt, AccountNumber } from './params';

export interface AccountRaw extends IDontKnowObject {
  accountNumber?: string;
  createdAt?: string | Date;
  amount?: number;
}

interface IAccount {
  accountNumber?: AccountNumber;
  createdAt?: CreatedAt;
  amount?: Amount;
}

export class Account {
  private _accountNumber: AccountNumber;
  private _amount: Amount;
  private _createdAt: CreatedAt;

  constructor({ accountNumber, amount, createdAt }: IAccount) {
    if (!accountNumber)
      throw new AccountError('Account Number should be exist');
    this._accountNumber = accountNumber;
    this._createdAt = createdAt!;
    this._amount = amount!;
  }

  setCreatedAt(createdAt: CreatedAt): Account {
    if (this._createdAt)
      throw new AccountError('Account CreatedAt Already defined');
    this._createdAt = createdAt;
    return this;
  }

  setAmount(amount: Amount): Account {
    if (this._createdAt)
      throw new AccountError('Account Amount Already defined');
    this._amount = amount;
    return this;
  }

  /** Getters */
  get accountNumber(): AccountNumber {
    return this._accountNumber;
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get amount(): Amount {
    return this._amount;
  }

  static new(): Account {
    return new Account({
      accountNumber: AccountNumber.new(),
      amount: new Amount(0),
      createdAt: CreatedAt.new(),
    });
  }

  getRaw(): AccountRaw {
    return {
      accountNumber: this.accountNumber.value,
      createdAt: this.createdAt.value.format(),
      amount: this.amount.value,
    };
  }
}
