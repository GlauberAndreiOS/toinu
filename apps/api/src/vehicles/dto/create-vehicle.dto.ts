import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  yearOfManufacture: number;

  @IsNumber()
  @IsNotEmpty()
  yearOfModel: number;

  @IsString()
  @IsNotEmpty()
  @Length(9, 11)
  renavam: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
