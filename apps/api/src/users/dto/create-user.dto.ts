import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '@toinu/shared-types';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email deve ser um endereço de email válido' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser DRIVER ou PASSENGER' })
  role?: UserRole;
}
