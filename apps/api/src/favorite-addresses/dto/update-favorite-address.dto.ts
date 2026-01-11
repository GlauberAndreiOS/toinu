import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteAddressDto } from './create-favorite-address.dto';

export class UpdateFavoriteAddressDto extends PartialType(CreateFavoriteAddressDto) {}
