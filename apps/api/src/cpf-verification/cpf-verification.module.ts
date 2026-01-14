import { Module } from '@nestjs/common';
import { CpfVerificationService } from './cpf-verification.service';
import { CbcCpfClient } from './cbc-cpf.client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CpfVerificationService, CbcCpfClient],
  exports: [CpfVerificationService],
})
export class CpfVerificationModule {}
