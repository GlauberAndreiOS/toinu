import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '@toinu/shared-types';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    // Verificar se o email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    // Retornar sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, data: UpdateUserDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updateData: {
      email?: string;
      name?: string;
      password?: string;
    } = {
      email: data.email,
      name: data.name,
    };

    // Se uma nova senha foi fornecida, fazer hash
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return true;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    // Retornar sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Retornar sem as senhas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user);
  }
}
