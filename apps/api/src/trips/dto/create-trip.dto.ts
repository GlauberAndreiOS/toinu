import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty({ message: 'A origem é obrigatória' })
  @IsString()
  origin: string;

  @IsNotEmpty({ message: 'O destino é obrigatório' })
  @IsString()
  destination: string;

  @IsUUID('4', { message: 'ID do passageiro inválido' })
  @IsNotEmpty()
  passengerId: string;

  @IsUUID('4', { message: 'ID do motorista inválido' })
  @IsNotEmpty()
  driverId: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  distanceKm?: number;
}
