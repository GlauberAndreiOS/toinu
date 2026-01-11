import { Injectable } from '@nestjs/common';
import { Vehicle as VehicleSchema, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VehiclesRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.VehicleUncheckedCreateInput,
  ): Promise<VehicleSchema> {
    return this.prisma.vehicle.create({
      data,
    });
  }

  async update(id: string, data: Prisma.VehicleUpdateInput): Promise<boolean> {
    const { count } = await this.prisma.vehicle.updateMany({
      where: { id },
      data,
    });
    return count > 0;
  }

  async delete(id: string): Promise<boolean> {
    const { count } = await this.prisma.vehicle.deleteMany({
      where: { id },
    });
    return count > 0;
  }

  async findById(id: string): Promise<VehicleSchema | null> {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async findByDriverId(driverId: string): Promise<VehicleSchema[]> {
    return this.prisma.vehicle.findMany({
      where: { driverId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<VehicleSchema[]> {
    return this.prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
