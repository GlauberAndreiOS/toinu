import { Injectable } from '@nestjs/common';
import { Trip as TripSchema, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TripCreateInput): Promise<TripSchema> {
    return this.prisma.trip.create({
      data,
    });
  }

  async findById(id: string): Promise<TripSchema | null> {
    return this.prisma.trip.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<TripSchema[]> {
    return this.prisma.trip.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
