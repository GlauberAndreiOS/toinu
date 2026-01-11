import { CreateVehicleDto } from './create-vehicle.dto';
import { IsOptional, IsString, IsNumber, Length } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @IsOptional()
  yearOfManufacture?: number;

  @IsNumber()
  @IsOptional()
  yearOfModel?: number;

  @IsString()
  @IsOptional()
  @Length(9, 11)
  renavam?: string;

  @IsString()
  @IsOptional()
  licensePlate?: string;

  @IsString()
  @IsOptional()
  color?: string;
}
