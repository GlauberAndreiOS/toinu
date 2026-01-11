import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CbcCpfClient {
  private readonly logger = new Logger(CbcCpfClient.name);

  // ⚠️ Em produção isso vem de env + OAuth2
  private readonly baseUrl =
    'https://apigateway.conectagov.estaleiro.serpro.gov.br/api-cpf-light/v2';

  async consultCpf(cpf: string) {
    this.logger.log(`Consultando CPF ${cpf} no CBC`);

    /**
     * ⚠️ SIMULAÇÃO:
     * Aqui você faria:
     *  - obter token OAuth2
     *  - chamar endpoint real
     */

    // ===== SIMULAÇÃO DE RESPOSTA REAL =====
    return {
      cpf,
      nome: 'JOAO DA SILVA',
      dataNascimento: '1990-05-20',
      situacaoCadastral: 'REGULAR',
    };

    /**
     * ===== IMPLEMENTAÇÃO REAL (comentada) =====
     *
     * const token = await this.getAccessToken();
     *
     * const response = await axios.post(
     *   `${this.baseUrl}/consulta/cpf`,
     *   { listaCpf: [cpf] },
     *   {
     *     headers: {
     *       Authorization: `Bearer ${token}`,
     *       'Content-Type': 'application/json',
     *     },
     *   },
     * );
     *
     * return response.data;
     */
  }
}
