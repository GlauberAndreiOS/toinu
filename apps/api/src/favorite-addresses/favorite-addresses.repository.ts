import { Injectable } from '@nestjs/common';
import { FavoriteAddress, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteAddressesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.FavoriteAddressUncheckedCreateInput): Promise<FavoriteAddress> {
    return this.prisma.favoriteAddress.create({
      data,
    });
  }

  async update(id: string, data: Prisma.FavoriteAddressUpdateInput): Promise<boolean> {
    const result = await this.prisma.favoriteAddress.updateMany({
      where: { id },
      data,
    });
    return result.count > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma.favoriteAddress.deleteMany({
      where: { id },
    });
    return result.count > 0;
  }

  async findById(id: string): Promise<FavoriteAddress | null> {
    return this.prisma.favoriteAddress.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<FavoriteAddress[]> {
    return this.prisma.favoriteAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<FavoriteAddress[]> {
    return this.prisma.favoriteAddress.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
