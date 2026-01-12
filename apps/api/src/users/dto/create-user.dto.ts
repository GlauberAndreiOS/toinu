import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString() street: string;
  @IsString() number: string;
  @IsOptional() @IsString() complement?: string;
  @IsString() neighborhood: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() zipCode: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Senha curta demais' })
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsDateString()
  birthDate: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
