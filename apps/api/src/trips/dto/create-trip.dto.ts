import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsString()
  passengerId: string;

  @IsNotEmpty()
  @IsString()
  driverId: string;
}
