import { Transaction } from '@transaction/core';
import {
  ExecuteTransactionAction,
  ExecuteTransactionActionDependencies,
  ExecuteTransactionActionPayload,
} from '@transaction/core/actions';

export { ExecuteTransactionActionDependencies as ExecuteTransactionApplicationDependencies };
export { ExecuteTransactionActionPayload as ExecuteTransactionApplicationPayload };

export class ExecuteTransactionApplication {
  private executeTransactionAction: ExecuteTransactionAction;

  constructor(dep: ExecuteTransactionActionDependencies) {
    this.executeTransactionAction = new ExecuteTransactionAction(dep);
  }

  async execute(
    payload: ExecuteTransactionActionPayload,
  ): Promise<Transaction> {
    try {
      const actionResult = await this.executeTransactionAction.execute(payload);
      return actionResult;
    } catch (error) {
      throw error;
    }
  }
}
