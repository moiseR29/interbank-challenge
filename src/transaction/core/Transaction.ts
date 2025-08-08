import { TransactionError } from './Error';
import {
  ID,
  DebitAccount,
  CreditAccount,
  Amount,
  ExecutedAt,
  State,
} from './params';

export interface TransactionRaw {
  id?: string;
  debit?: string;
  credit?: string;
  amount?: number;
  executedAt?: string | Date;
  state?: string;
}

export interface ITransaction {
  id?: ID;
  debit?: DebitAccount;
  credit?: CreditAccount;
  amount?: Amount;
  executedAt?: ExecutedAt;
  state?: State;
}

export class Transaction {
  private _id: ID;
  private _debit: DebitAccount;
  private _credit: CreditAccount;
  private _amount: Amount;
  private _executedAt: ExecutedAt;
  private _state: State;

  constructor({ id, debit, credit, amount, executedAt, state }: ITransaction) {
    this._id = id!;
    this._debit = debit!;
    this._credit = credit!;
    this._amount = amount!;
    this._executedAt = executedAt!;
    this._state = state!;
  }

  /** Setters */
  setDebit(debit: DebitAccount): Transaction {
    if (this._debit)
      throw new TransactionError('Transaction debit account Already defined');
    this._debit = debit;
    return this;
  }

  setCredit(credit: CreditAccount): Transaction {
    if (this._credit)
      throw new TransactionError('Transaction credit account Already defined');
    this._credit = credit;
    return this;
  }

  setAmount(amount: Amount): Transaction {
    if (this._amount)
      throw new TransactionError('Transaction amount Already defined');
    this._amount = amount;
    return this;
  }

  setExecutedAt(executedAt: ExecutedAt): Transaction {
    if (this._executedAt)
      throw new TransactionError('Transaction executedAt Already defined');
    this._executedAt = executedAt;
    return this;
  }

  setState(state: State): Transaction {
    if (this._state)
      throw new TransactionError('Transaction state Already defined');
    this._state = state;
    return this;
  }

  /** Getters */
  get id(): ID {
    return this._id;
  }

  get debit(): DebitAccount {
    return this._debit;
  }

  get credit(): CreditAccount {
    return this._credit;
  }

  get amount(): Amount {
    return this._amount;
  }

  get executedAt(): ExecutedAt {
    return this._executedAt;
  }

  get state(): State {
    return this._state;
  }

  getRaw(): TransactionRaw {
    return {
      id: this.id.value,
      debit: this.debit.value,
      credit: this.credit.value,
      amount: this.amount.value,
      executedAt: this.executedAt.value.format(),
      state: this.state.value,
    };
  }
}
