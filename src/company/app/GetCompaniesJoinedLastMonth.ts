import {
  GetCompaniesJoinedLastMonthAction,
  GetCompaniesJoinedLastMonthActionDependencies,
} from '@company/core/actions';
import { Company } from '@company/core';

export { GetCompaniesJoinedLastMonthActionDependencies as GetCompaniesJoinedLastMonthApplicationDependencies };

export class GetCompaniesJoinedLastMonthApplication {
  private getCompaniesExecuteTransactionLastMonthAction: GetCompaniesJoinedLastMonthAction;

  constructor(dep: GetCompaniesJoinedLastMonthActionDependencies) {
    this.getCompaniesExecuteTransactionLastMonthAction =
      new GetCompaniesJoinedLastMonthAction(dep);
  }

  async execute(): Promise<Array<Company>> {
    try {
      const actionResult =
        await this.getCompaniesExecuteTransactionLastMonthAction.execute();
      return actionResult;
    } catch (error) {
      throw error;
    }
  }
}
