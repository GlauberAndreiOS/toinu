import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User as UserSchema } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { CpfVerificationService } from '../cpf-verification/cpf-verification.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private cpfVerificationService: CpfVerificationService,
  ) {}

  async create(data: CreateUserDto): Promise<UserSchema> {
    const existing = await this.repository.findByEmail(data.email);
    if (existing) throw new ConflictException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { role, ...rest } = data as any;

    const user = await this.repository.create({
      ...rest,
      password: hashedPassword,
      ...(role === 'DRIVER' && {
        driver: {
          create: {
            cnh: rest.cnh,
            cnhExpiration: new Date(rest.cnhExpiration),
            ...(rest.vehicle && {
              vehicles: { create: rest.vehicle }
            })
          }
        }
      }),
      ...(role === 'PASSENGER' && {
        passenger: { create: {} }
      })
    });

    if (role === 'PASSENGER' && (user as any).passenger) {
      this.cpfVerificationService.verifyPassengerCpf((user as any).passenger.id);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<boolean> {
    const user = await this.repository.findById(id);
    if (!user) return false;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updateData = { ...data } as any;

    if (updateData.address) {
      updateData.address = JSON.parse(JSON.stringify(updateData.address));
    }

    await this.repository.update(id, updateData);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.repository.findById(id);
    if (!user) return false;

    await this.repository.delete(id);
    return true;
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
