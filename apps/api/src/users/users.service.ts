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
        : role === 'PASSENGER'
          ? {
              passenger: {
                create: {
                  fullName: fullName || '',
                  cpf: cpf || '',
                  birthDate: birthDate ? new Date(birthDate) : new Date(),
                  phoneContact: phone,
                  address: address as any,
                },
              },
            }
          : {}), // Se não tiver role, cria apenas o usuário base
    })) as any;

    // Se for passageiro, dispara a verificação de CPF em "background"
    if (role === 'PASSENGER' && user.passenger) {
      await this.cpfVerificationService.verifyPassengerCpf(user.passenger.id);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<boolean> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const { role, ...userData } = data as any;

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

    // Se houver campos de perfil, precisamos fazer um update específico
    if (role || fullName || birthDate || cpf || phone) {
      const user = (await this.repository.findById(id)) as any;
      if (!user) return false;

      const updateData: any = {
        ...baseUserData,
      };

      if (role === 'PASSENGER' || (!role && user.passenger)) {
        updateData.passenger = {
          upsert: {
            create: {
              fullName: fullName || user.passenger?.fullName || '',
              cpf: cpf || user.passenger?.cpf || '',
              birthDate: birthDate
                ? new Date(birthDate)
                : user.passenger?.birthDate || new Date(),
              phoneContact: phone || user.passenger?.phoneContact,
              address: address as any,
            },
            update: {
              fullName: fullName,
              cpf: cpf,
              birthDate: birthDate ? new Date(birthDate) : undefined,
              phoneContact: phone,
              address: address as any,
            },
          },
        };

        // Se estiver criando o perfil agora e tiver CPF, dispara verificação
        if (!user.passenger && (cpf || user.passenger?.cpf)) {
          // Adiaremos o disparo para após o save bem sucedido ou faremos aqui se tivermos o ID
        }
      } else if (role === 'DRIVER' || (!role && user.driver)) {
        updateData.driver = {
          upsert: {
            create: {
              fullName: fullName || user.driver?.fullName || '',
              birthDate: birthDate
                ? new Date(birthDate)
                : user.driver?.birthDate || new Date(),
              cpf: cpf || user.driver?.cpf || '',
              phoneContact: phone || user.driver?.phoneContact,
              emailContact: emailContact || user.driver?.emailContact,
              cnh: cnh || user.driver?.cnh || '',
              cnhExpiration: cnhExpiration
                ? new Date(cnhExpiration)
                : user.driver?.cnhExpiration || new Date(),
              address: address as any,
            },
            update: {
              fullName: fullName,
              birthDate: birthDate ? new Date(birthDate) : undefined,
              cpf: cpf,
              phoneContact: phone,
              emailContact: emailContact,
              cnh: cnh,
              cnhExpiration: cnhExpiration
                ? new Date(cnhExpiration)
                : undefined,
              address: address as any,
            },
          },
        };
      }

      await this.repository.updateWithNested(id, updateData);

      // Dispara verificação se for passageiro e acabou de preencher CPF
      if (
        (role === 'PASSENGER' || user.passenger) &&
        (cpf || user.passenger?.cpf)
      ) {
        const updatedUser = (await this.repository.findById(id)) as any;
        if (
          updatedUser?.passenger &&
          updatedUser.passenger.status === 'PENDING_VERIFICATION'
        ) {
          this.cpfVerificationService.verifyPassengerCpf(
            updatedUser.passenger.id,
          );
        }
      }

      return true;
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
