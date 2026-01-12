import { IsEnum, IsOptional, IsNumber, IsDateString, IsUUID } from 'class-validator';
import { TripStatus } from '@prisma/client';

export class UpdateTripDto {
  @IsOptional()
  @IsEnum(TripStatus, { message: 'Status de viagem inválido' })
  status?: TripStatus;

  @IsOptional()
  @IsUUID('4', { message: 'ID do veículo inválido' })
  vehicleId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data de início inválida' })
  startedAt?: Date;

  @IsOptional()
  @IsDateString({}, { message: 'Data de finalização inválida' })
  finishedAt?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'A distância deve ser um número' })
  distanceKm?: number;
}
