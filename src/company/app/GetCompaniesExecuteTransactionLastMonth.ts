import {
  GetCompaniesExecuteTransactionLastMonthAction,
  GetCompaniesExecuteTransactionLastMonthActionDependencies,
  GetCompaniesExecuteTransactionLastMonthActionResponse,
} from '@company/core/actions';

export { GetCompaniesExecuteTransactionLastMonthActionDependencies as GetCompaniesExecuteTransactionLastMonthApplicationDependencies };
export { GetCompaniesExecuteTransactionLastMonthActionResponse as GetCompaniesExecuteTransactionLastMonthApplicationResponse };

export class GetCompaniesExecuteTransactionLastMonthApplication {
  private getCompaniesExecuteTransactionLastMonthAction: GetCompaniesExecuteTransactionLastMonthAction;

  constructor(dep: GetCompaniesExecuteTransactionLastMonthActionDependencies) {
    this.getCompaniesExecuteTransactionLastMonthAction =
      new GetCompaniesExecuteTransactionLastMonthAction(dep);
  }

  async execute(): Promise<
    Array<GetCompaniesExecuteTransactionLastMonthActionResponse>
  > {
    try {
      const actionResponse =
        await this.getCompaniesExecuteTransactionLastMonthAction.execute();
      return actionResponse;
    } catch (error) {
      throw error;
    }
  }
}
