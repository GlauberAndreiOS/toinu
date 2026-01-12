import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { CreateUserDto} from '../../users/dto/create-user.dto';

export class CreateDriverDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'A CNH é obrigatória' })
  cnh: string;

  @IsDateString({}, { message: 'Data de expiração da CNH inválida' })
  cnhExpiration: string;
}
