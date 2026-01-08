import { Injectable } from '@nestjs/common';
import { User as UserSchema } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(data: CreateUserDto): Promise<UserSchema> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { role, ...userData } = data;

    return this.repository.create({
      ...userData,
      password: hashedPassword,
      role,
      ...(role === 'DRIVER'
        ? { driver: { create: {} } }
        : { passenger: { create: {} } }),
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<boolean> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async findOne(id: string): Promise<UserSchema | null> {
    return this.repository.findById(id);
  }

  async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async findAll(): Promise<UserSchema[]> {
    return this.repository.findAll();
  }
}
