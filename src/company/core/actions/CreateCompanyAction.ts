import { Logger } from '@shared/core';
import {
  CUIT,
  Name,
  Type,
  CompanyRepository,
  CompanyError,
  Company,
  CreatedAt,
  ID,
} from '@company/core';
import { Account } from '@account/core';

export interface CreateCompanyActionDependencies {
  logger: Logger;
  companyRepository: CompanyRepository;
}

export interface CreateCompanyActionPayload {
  cuit: CUIT;
  name: Name;
  type: Type;
  account: Account;
}

export class CreateCompanyAction {
  constructor(private readonly dep: CreateCompanyActionDependencies) {}

  async execute(payload: CreateCompanyActionPayload) {
    try {
      this.dep.logger.info('Executing CreateCompanyApp..');
      this.dep.logger.info('Verify exist cuit');
      const cuitIsExists =
        await this.dep.companyRepository.verifyExistsCompanyByCuit(
          payload.cuit,
        );

      if (cuitIsExists)
        throw new CompanyError('Company cuit already exists on database');

      const companyID = ID.new();
      this.dep.logger.log('Generating new Company.');
      const company = new Company({ id: companyID });

      this.dep.logger.log('Setting CUIT.');
      company.setCUIT(payload.cuit);

      this.dep.logger.log('Setting CreatedAt.');
      company.setCreatedAt(CreatedAt.new());

      this.dep.logger.log('Setting Name.');
      company.setName(payload.name);

      this.dep.logger.log('Setting Type.');
      company.setType(payload.type);

      this.dep.logger.log('Setting Account.');
      company.setAccount(payload.account);

      this.dep.logger.log('Saving Company.');
      await this.dep.companyRepository.save(company);
      return company;
    } catch (error) {
      throw error;
    }
  }
}
