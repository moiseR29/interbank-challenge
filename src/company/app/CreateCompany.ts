import {
  Company,
  CompanyRaw,
  CompanyRepository,
  CreatedAt,
  CUIT,
  ID,
  Name,
  Type,
} from '@company/core';
import { App, AppDependencies } from '@shared/app';
import { CreateAccount, CreateAccountDependencies } from '@account/app';

export interface CreateCompanyDependencies
  extends CreateAccountDependencies,
    AppDependencies {
  companyRepository: CompanyRepository;
}

export interface CreateCompanyPayload extends CompanyRaw {}

export class CreateCompany extends App {
  private repository: CompanyRepository;
  private createAccountApp: CreateAccount;

  constructor(dep: CreateCompanyDependencies) {
    super(dep);
    this.repository = dep.companyRepository;
    this.createAccountApp = new CreateAccount(dep);
  }

  async execute(payload: CreateCompanyPayload): Promise<Company> {
    try {
      this.logger.info('Executing CreateCompanyApp..');
      const { cuit, name, type } = payload;

      const companyID = ID.new();
      this.logger.log('Generating new Company.');
      const company = new Company({ id: companyID });

      this.logger.log('Setting CreatedAt.');
      company.setCreatedAt(CreatedAt.new());

      this.logger.log('Setting CUIT.');
      company.setCUIT(new CUIT(cuit!));

      this.logger.log('Setting Name.');
      company.setName(new Name(name!));

      this.logger.log('Setting Type.');
      company.setType(type ? new Type(type) : Type.default());

      this.logger.log('Creating and Setting Account.');
      const account = await this.createAccountApp.execute();
      company.setAccount(account);

      this.logger.log('Saving Company.');
      await this.repository.save(company);
      return company;
    } catch (error) {
      throw error;
    }
  }
}
