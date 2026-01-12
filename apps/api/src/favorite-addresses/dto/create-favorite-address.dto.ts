import { IsNumber, IsOptional, IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateFavoriteAddressDto {
  @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O userId é obrigatório' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'O rótulo (ex: Casa) é obrigatório' })
  label: string;

  @IsString()
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  street: string;

  @IsString()
  @IsNotEmpty({ message: 'O número é obrigatório' })
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  neighborhood: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  state: string;

  @IsString()
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  zipCode: string;

  @IsOptional()
  @IsNumber({}, { message: 'A latitude deve ser um número' })
  latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'A longitude deve ser um número' })
  longitude?: number;
}
