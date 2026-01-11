import { Module } from '@nestjs/common';
import { CpfVerificationService } from './cpf-verification.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CpfVerificationService],
  exports: [CpfVerificationService],
})
export class CpfVerificationModule {}
