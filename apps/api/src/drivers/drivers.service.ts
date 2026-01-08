import { Injectable } from '@nestjs/common';
import { Driver as DriverSchema } from '@prisma/client';
import { DriversRepository } from './drivers.repository';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private repository: DriversRepository) {}

  async findAll(): Promise<DriverSchema[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<DriverSchema | null> {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdateDriverDto): Promise<boolean> {
    // Implementar lógica de update se houver campos no Driver futuramente
    return true;
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
