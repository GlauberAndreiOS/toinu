import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CbcCpfClient } from './cbc-cpf.client';

@Injectable()
export class CpfVerificationService {
  private readonly logger = new Logger(CpfVerificationService.name);

  constructor(
    private prisma: PrismaService,
    private cbcCpfClient: CbcCpfClient,
  ) {}

  async verifyPassengerCpf(passengerId: string) {
    const passenger = await this.prisma.passenger.findUnique({
      where: { id: passengerId },
      include: { user: true }
    });

    if (!passenger || !passenger.user) return;

    const result = await this.cbcCpfClient.consultCpf(passenger.user.cpf);

    const nomeConfere = result.nome.toUpperCase() === passenger.user.fullName.toUpperCase();
    const nascimentoConfere =
      new Date(result.dataNascimento).toISOString().slice(0, 10) ===
      passenger.user.birthDate.toISOString().slice(0, 10);

    const aprovado = nomeConfere && nascimentoConfere && result.situacaoCadastral === 'REGULAR';

    await this.prisma.cpfVerification.create({
      data: {
        passengerId: passenger.id,
        cpf: passenger.user.cpf,
        fullName: passenger.user.fullName,
        birthDate: passenger.user.birthDate,
        provider: 'CBC_GOV_BR',
        status: aprovado ? 'APPROVED' : 'REJECTED',
        rawResponse: result as any
      }
    });

    await this.prisma.passenger.update({
      where: { id: passengerId },
      data: {
        status: aprovado ? 'VERIFIED' : 'REJECTED',
        cpfVerified: aprovado,
        cpfVerifiedAt: aprovado ? new Date() : null
      }
    });
  }
}
