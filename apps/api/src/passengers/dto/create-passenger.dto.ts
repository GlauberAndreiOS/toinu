import { CreateUserDto } from '../../users/dto/create-user.dto'
import { IsOptional, IsString } from 'class-validator';

export class CreatePassengerDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  referralCode?: string;
}
