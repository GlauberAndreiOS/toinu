import { Injectable } from '@nestjs/common';
import { Trip as TripSchema } from '@prisma/client';
import { TripsRepository } from './trips.repository';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private repository: TripsRepository) {}

  async create(data: CreateTripDto): Promise<TripSchema> {
    const { passengerId, driverId, ...rest } = data;
    return this.repository.create({
      ...rest,
      passenger: { connect: { id: passengerId } },
      driver: { connect: { id: driverId } },
    });
  }

  async findOne(id: string): Promise<TripSchema | null> {
    return this.repository.findById(id);
  }

  async findByPassengerId(passengerId: string): Promise<TripSchema[]> {
    return this.repository.findByPassengerId(passengerId);
  }

  async findAll(): Promise<TripSchema[]> {
    return this.repository.findAll();
  }
}
