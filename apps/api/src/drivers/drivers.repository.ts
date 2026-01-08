import { Injectable } from '@nestjs/common';
import { Driver as DriverSchema } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriversRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<DriverSchema | null> {
    return this.prisma.driver.findUnique({
      where: { id },
      include: {
        user: true,
        trips: true,
      },
    });
  }

  async findAll(): Promise<DriverSchema[]> {
    return this.prisma.driver.findMany({
      include: {
        user: true,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const { count } = await this.prisma.driver.deleteMany({
      where: { id },
    });
    return count > 0;
  }
}
