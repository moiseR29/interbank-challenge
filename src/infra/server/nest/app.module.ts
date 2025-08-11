import 'module-alias/register';
import { Module } from '@nestjs/common';
import { CompanyModule } from '@company/infra/nest';
import { TransactionModule } from '@transaction/infra/nest';

@Module({
  imports: [CompanyModule, TransactionModule],
})
export class AppModule {}
