import { TransactionError } from './Error';
import { ID, DebitAccount, CreditAccount, Amount, ExecutedAt } from './params';

export interface TransactionRaw {
  id?: string;
  debit?: string;
  credit?: string;
  amount?: number;
  executedAt?: string | Date;
}

export interface ITransaction {
  id?: ID;
  debit?: DebitAccount;
  credit?: CreditAccount;
  amount?: Amount;
  executedAt?: ExecutedAt;
}

export class Transaction {
  private _id: ID;
  private _debit: DebitAccount;
  private _credit: CreditAccount;
  private _amount: Amount;
  private _executedAt: ExecutedAt;

  constructor({ id, debit, credit, amount, executedAt }: ITransaction) {
    this._id = id!;
    this._debit = debit!;
    this._credit = credit!;
    this._amount = amount!;
    this._executedAt = executedAt!;
  }

  /** Setters */
  setDebit(debit: DebitAccount): Transaction {
    if (this._debit) throw TransactionError.alreadyRefined('debit account');
    this._debit = debit;
    return this;
  }

  setCredit(credit: CreditAccount): Transaction {
    if (this._credit) throw TransactionError.alreadyRefined('credit account');
    this._credit = credit;
    return this;
  }

  setAmount(amount: Amount): Transaction {
    if (this._amount) throw TransactionError.alreadyRefined('amount');
    this._amount = amount;
    return this;
  }

  setExecutedAt(executedAt: ExecutedAt): Transaction {
    if (this._executedAt) throw TransactionError.alreadyRefined('executedAt');
    this._executedAt = executedAt;
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

  getRaw(): TransactionRaw {
    return {
      id: this.id.value,
      debit: this.debit.value,
      credit: this.credit.value,
      amount: this.amount.value,
      executedAt: this.executedAt.value.format(),
    };
  }
}
