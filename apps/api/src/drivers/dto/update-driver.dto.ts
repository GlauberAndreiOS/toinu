import { IsOptional, IsString } from 'class-validator';

export class UpdateDriverDto {
  // Por enquanto, não temos campos extras no Driver além do vínculo com User,
  // mas deixamos o DTO pronto para futuras expansões (ex: placa do carro, CNH).
  @IsOptional()
  @IsString()
  placeholder?: string;
}
