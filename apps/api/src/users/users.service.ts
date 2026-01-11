import { Injectable } from '@nestjs/common';
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
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { role, ...userData } = data;

    const {
      fullName,
      birthDate,
      cpf,
      phone,
      emailContact,
      cnh,
      cnhExpiration,
      address,
      vehicle,
      ...baseUserData
    } = userData;

    const user = (await this.repository.create({
      ...baseUserData,
      password: hashedPassword,
      phone: phone,
      ...(role === 'DRIVER'
        ? {
            driver: {
              create: {
                fullName: fullName || '',
                birthDate: birthDate ? new Date(birthDate) : new Date(),
                cpf: cpf || '',
                phoneContact: phone,
                emailContact: emailContact,
                cnh: cnh || '',
                cnhExpiration: cnhExpiration
                  ? new Date(cnhExpiration)
                  : new Date(),
                address: address as any,
                ...(vehicle
                  ? {
                      vehicles: {
                        create: vehicle,
                      },
                    }
                  : {}),
              },
            },
          }
        : {
            passenger: {
              create: {
                fullName: fullName || '',
                cpf: cpf || '',
                birthDate: birthDate ? new Date(birthDate) : new Date(),
                phoneContact: phone,
                address: address as any,
              },
            },
          }),
    })) as any;

    // Se for passageiro, dispara a verificação de CPF em "background"
    if (role === 'PASSENGER' && user.passenger) {
      this.cpfVerificationService.verifyPassengerCpf(user.passenger.id);
    }

    return user;
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
