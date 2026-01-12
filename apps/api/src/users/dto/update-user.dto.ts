import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { UserRole } from '@toinu/shared-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser DRIVER ou PASSENGER' })
  role?: UserRole;

  @IsOptional()
  @IsString()
  currentSessionToken?: string;
}
