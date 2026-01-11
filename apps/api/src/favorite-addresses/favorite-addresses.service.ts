import { Injectable } from '@nestjs/common';
import { PassengerFavoriteAddress as FavoriteAddressSchema } from '@prisma/client';
import { FavoriteAddressesRepository } from './favorite-addresses.repository';
import { CreateFavoriteAddressDto } from './dto/create-favorite-address.dto';
import { UpdateFavoriteAddressDto } from './dto/update-favorite-address.dto';

@Injectable()
export class FavoriteAddressesService {
  constructor(private repository: FavoriteAddressesRepository) {}

  async create(data: CreateFavoriteAddressDto): Promise<FavoriteAddressSchema> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateFavoriteAddressDto): Promise<boolean> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async findOne(id: string): Promise<FavoriteAddressSchema | null> {
    return this.repository.findById(id);
  }

  async findByPassengerId(passengerId: string): Promise<FavoriteAddressSchema[]> {
    return this.repository.findByPassengerId(passengerId);
  }

  async findAll(): Promise<FavoriteAddressSchema[]> {
    return this.repository.findAll();
  }
}
