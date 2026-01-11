import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PassengerStatus, CpfVerificationStatus } from '@toinu/shared-types';
import { CbcCpfClient } from './cbc-cpf.client';

@Injectable()
export class CpfVerificationService {
  private readonly logger = new Logger(CpfVerificationService.name);

  constructor(
    private prisma: PrismaService,
    private cbcCpfClient: CbcCpfClient,
  ) {}

  /**
   * Este método é pensado para ser chamado por:
   * - job
   * - fila
   * - cron
   */
  async verifyPassengerCpf(passengerId: string) {
    this.logger.log(
      `Iniciando verificação de CPF para passageiro ${passengerId}`,
    );

    const passenger = await this.prisma.passenger.findUnique({
      where: { id: passengerId },
    });

    if (!passenger) {
      this.logger.error(`Passageiro ${passengerId} não encontrado`);
      return;
    }

    // 1️⃣ Consulta base oficial (Gov)
    const result = await this.cbcCpfClient.consultCpf(passenger.cpf);

    // 2️⃣ Validações mínimas
    const nomeConfere =
      result.nome.toUpperCase() === passenger.fullName.toUpperCase();

    const nascimentoConfere =
      new Date(result.dataNascimento).toISOString().slice(0, 10) ===
      passenger.birthDate.toISOString().slice(0, 10);

    const cpfRegular = result.situacaoCadastral === 'REGULAR';

    const aprovado = nomeConfere && nascimentoConfere && cpfRegular;

    // 3️⃣ Persistência transacional
    await this.prisma.$transaction([
      this.prisma.cpfVerification.create({
        data: {
          passengerId: passenger.id,
          cpf: passenger.cpf,
          fullName: passenger.fullName,
          birthDate: passenger.birthDate,
          provider: 'CBC_GOV_BR',
          status: aprovado
            ? CpfVerificationStatus.APPROVED
            : CpfVerificationStatus.REJECTED,
          rawResponse: result,
        },
      }),

      this.prisma.passenger.update({
        where: { id: passenger.id },
        data: aprovado
          ? {
              status: PassengerStatus.VERIFIED,
              cpfVerified: true,
              cpfVerifiedAt: new Date(),
            }
          : {
              status: PassengerStatus.REJECTED,
            },
      }),
    ]);

    this.logger.log(
      `Verificação CPF finalizada para ${passengerId} → ${
        aprovado ? 'APROVADO' : 'REJEITADO'
      }`,
    );
  }
}
