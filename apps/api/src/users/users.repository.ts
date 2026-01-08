import { Injectable } from '@nestjs/common';
import { User as UserSchema, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<UserSchema> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<boolean> {
    const { count } = await this.prisma.user.updateMany({
      where: { id },
      data,
    });
    return count > 0;
  }

  async delete(id: string): Promise<boolean> {
    const { count } = await this.prisma.user.deleteMany({
      where: { id },
    });
    return count > 0;
  }

  async findById(id: string): Promise<UserSchema | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        driver: true,
        passenger: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserSchema | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        driver: true,
        passenger: true,
      },
    });
  }

  async findAll(): Promise<UserSchema[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        driver: true,
        passenger: true,
      },
    });
  }
}
