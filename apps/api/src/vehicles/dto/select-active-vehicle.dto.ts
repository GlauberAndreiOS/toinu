import { IsUUID, IsNotEmpty } from 'class-validator';

export class SelectActiveVehicleDto {
  @IsUUID('4', { message: 'ID do veículo inválido' })
  @IsNotEmpty({ message: 'O ID do veículo é obrigatório' })
  vehicleId: string;
}
