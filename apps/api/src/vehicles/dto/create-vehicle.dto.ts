import { IsString, IsNotEmpty, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateVehicleDto {
  @IsUUID()
  driverId: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  yearOfManufacture: number;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  yearOfModel: number;

  @IsString()
  @IsNotEmpty()
  renavam: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
