import { IsOptional, IsString } from 'class-validator';

export class UpdatePassengerDto {
  @IsOptional()
  @IsString()
  placeholder?: string;
}
