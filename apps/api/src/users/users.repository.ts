import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, Passenger } from '@prisma/client';

// Define o tipo de retorno incluindo as relações
const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    driver: { include: { vehicles: true } },
    passenger: true,
    favoriteAddresses: true,
  },
});

export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>;

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<UserWithRelations> {
    return this.prisma.user.create({
      data,
      include: {
        driver: { include: { vehicles: true } },
        passenger: true,
        favoriteAddresses: true,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<UserWithRelations> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        driver: { include: { vehicles: true } },
        passenger: true,
        favoriteAddresses: true,
      },
    });
  }

  async findById(id: string): Promise<UserWithRelations | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        driver: { include: { vehicles: true } },
        passenger: true,
        favoriteAddresses: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserWithRelations | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        driver: { include: { vehicles: true } },
        passenger: true,
        favoriteAddresses: true,
      },
    });
  }

  async findAll(): Promise<UserWithRelations[]> {
    return this.prisma.user.findMany({
      include: {
        driver: { include: { vehicles: true } },
        passenger: true,
        favoriteAddresses: true,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async createPassenger(userId: string): Promise<Passenger> {
    return this.prisma.passenger.create({
      data: {
        userId,
      },
    });
  }
}
