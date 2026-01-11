import { Injectable } from '@nestjs/common';
import { Vehicle as VehicleSchema } from '@prisma/client';
import { VehiclesRepository } from './vehicles.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private repository: VehiclesRepository) {}

  async create(data: CreateVehicleDto): Promise<VehicleSchema> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateVehicleDto): Promise<boolean> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async findOne(id: string): Promise<VehicleSchema | null> {
    return this.repository.findById(id);
  }

  async findByDriverId(driverId: string): Promise<VehicleSchema[]> {
    return this.repository.findByDriverId(driverId);
  }

  async findAll(): Promise<VehicleSchema[]> {
    return this.repository.findAll();
  }
}
