import { Injectable } from '@nestjs/common';
import { PassengerFavoriteAddress, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteAddressesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PassengerFavoriteAddressUncheckedCreateInput): Promise<PassengerFavoriteAddress> {
    return this.prisma.passengerFavoriteAddress.create({
      data,
    });
  }

  async update(id: string, data: Prisma.PassengerFavoriteAddressUpdateInput): Promise<boolean> {
    const { count } = await this.prisma.passengerFavoriteAddress.updateMany({
      where: { id },
      data,
    });
    return count > 0;
  }

  async delete(id: string): Promise<boolean> {
    const { count } = await this.prisma.passengerFavoriteAddress.deleteMany({
      where: { id },
    });
    return count > 0;
  }

  async findById(id: string): Promise<PassengerFavoriteAddress | null> {
    return this.prisma.passengerFavoriteAddress.findUnique({
      where: { id },
    });
  }

  async findByPassengerId(passengerId: string): Promise<PassengerFavoriteAddress[]> {
    return this.prisma.passengerFavoriteAddress.findMany({
      where: { passengerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<PassengerFavoriteAddress[]> {
    return this.prisma.passengerFavoriteAddress.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
