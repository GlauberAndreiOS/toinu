import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CbcCpfClient {
  private readonly logger = new Logger(CbcCpfClient.name);
  private readonly baseUrl =
    'https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cpf-light/v2';

  async consultCpf(
    cpf: string,
    fullName?: string,
    birthDate?: Date,
  ): Promise<any> {
    this.logger.log(`Iniciando consulta de CPF: ${cpf}`);

    if (process.env.NODE_ENV === 'development') {
      await this.delay(2000);

      return {
        cpf: cpf,
        nome: fullName || 'NOME MOCKADO',
        dataNascimento: birthDate
          ? birthDate.toISOString().slice(0, 10)
          : '1990-01-01',
        situacaoCadastral: 'REGULAR',
      };
    }

    return this.realConsultation(cpf);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async realConsultation(cpf: string): Promise<any> {
    throw new Error('Método de produção não implementado');
  }
}
