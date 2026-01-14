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

  async findByPassengerId(passengerId: string): Promise<TripSchema[]> {
    return this.prisma.trip.findMany({
      where: { passengerId },
      orderBy: { createdAt: 'desc' },
      include: {
        driver: {
          include: {
            user: true, // Para pegar o nome do motorista se necessário
            vehicles: true,
          }
        },
        vehicle: true,
      }
    });
  }

  async findAll(): Promise<TripSchema[]> {
    return this.prisma.trip.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
