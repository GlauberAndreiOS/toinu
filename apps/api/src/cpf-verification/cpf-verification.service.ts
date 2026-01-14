import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CbcCpfClient } from './cbc-cpf.client';
import { CpfVerificationStatus } from '@prisma/client';

@Injectable()
export class CpfVerificationService {
  private readonly logger = new Logger(CpfVerificationService.name);

  constructor(
    private prisma: PrismaService,
    private cbcCpfClient: CbcCpfClient,
  ) {}

  async verifyPassengerCpf(passengerId: string): Promise<void> {
    this.logger.log(
      `[JOB START] Iniciando verificação para o passageiro: ${passengerId}`,
    );

    const passenger = await this.prisma.passenger.findUnique({
      where: { id: passengerId },
      include: { user: true },
    });

    if (!passenger || !passenger.user || !passenger.user.cpf) {
      this.logger.warn(
        `[JOB ABORTED] Dados insuficientes para o passageiro ${passengerId}`,
      );
      return;
    }

    try {
      this.logger.log(
        `[API CALL] Consultando CPF ${passenger.user.cpf} no CBC...`,
      );

      const result = await this.cbcCpfClient.consultCpf(
        passenger.user.cpf,
        passenger.user.fullName,
        passenger.user.birthDate,
      );

      this.logger.log(
        `[VALIDATING] Comparando dados retornados para ${passenger.user.fullName}`,
      );

      const nomeConfere =
        result.nome.toUpperCase() === passenger.user.fullName.toUpperCase();

      const nascimentoConfere =
        new Date(result.dataNascimento).toISOString().slice(0, 10) ===
        new Date(passenger.user.birthDate).toISOString().slice(0, 10);

      const aprovado =
        nomeConfere &&
        nascimentoConfere &&
        result.situacaoCadastral === 'REGULAR';

      this.logger.log(
        `[DATABASE] Gravando log de verificação. Status: ${aprovado ? 'APROVADO' : 'REPROVADO'}`,
      );

      await this.prisma.cpfVerification.create({
        data: {
          passengerId: passenger.id,
          cpf: passenger.user.cpf,
          fullName: passenger.user.fullName,
          birthDate: passenger.user.birthDate,
          provider: 'CBC_GOV_BR',
          status: aprovado
            ? CpfVerificationStatus.APPROVED
            : CpfVerificationStatus.REJECTED,
          rawResponse: result as any,
        },
      });

      await this.prisma.passenger.update({
        where: { id: passengerId },
        data: {
          status: aprovado ? 'VERIFIED' : 'REJECTED',
          cpfVerified: aprovado,
          cpfVerifiedAt: aprovado ? new Date() : null,
        },
      });

      this.logger.log(
        `[JOB COMPLETED] Processo finalizado com sucesso para ${passengerId}`,
      );
    } catch (error) {
      this.logger.error(
        `[JOB ERROR] Falha na verificação do passageiro ${passengerId}: ${error.message}`,
      );

      await this.prisma.cpfVerification.create({
        data: {
          passengerId: passenger.id,
          cpf: passenger.user.cpf,
          fullName: passenger.user.fullName,
          birthDate: passenger.user.birthDate,
          provider: 'CBC_GOV_BR',
          status: CpfVerificationStatus.ERROR,
          rawResponse: { error: error.message } as any,
        },
      });
    }
  }
}
