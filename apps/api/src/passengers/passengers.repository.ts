import { Injectable } from '@nestjs/common';
import { Passenger as PassengerSchema } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PassengersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<PassengerSchema | null> {
    return this.prisma.passenger.findUnique({
      where: { id },
      include: {
        user: true,
        trips: true,
      },
    });
  }

  async findAll(): Promise<PassengerSchema[]> {
    return this.prisma.passenger.findMany({
      include: {
        user: true,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const { count } = await this.prisma.passenger.deleteMany({
      where: { id },
    });
    return count > 0;
  }
}
