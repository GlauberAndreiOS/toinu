import { Injectable } from '@nestjs/common';
import { Passenger as PassengerSchema } from '@prisma/client';
import { PassengersRepository } from './passengers.repository';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(private repository: PassengersRepository) {}

  async findAll(): Promise<PassengerSchema[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<PassengerSchema | null> {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdatePassengerDto): Promise<boolean> {
    return true;
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
