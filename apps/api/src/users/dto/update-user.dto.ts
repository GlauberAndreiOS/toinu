import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '@toinu/shared-types';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Nome completo deve ser uma string' })
  fullName?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser DRIVER ou PASSENGER' })
  role?: UserRole;
}
