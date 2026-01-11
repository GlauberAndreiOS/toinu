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

  @IsOptional()
  @IsString({ message: 'Nome completo deve ser uma string' })
  fullName?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser DRIVER ou PASSENGER' })
  role?: UserRole;

  // Driver fields

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  emailContact?: string;

  @IsOptional()
  @IsString()
  cnh?: string;

  @IsOptional()
  @IsString()
  cnhExpiration?: string;

  @IsOptional()
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @IsOptional()
  vehicle?: {
    brand: string;
    model: string;
    yearOfManufacture: number;
    yearOfModel: number;
    renavam: string;
    licensePlate: string;
    color: string;
  };
}
