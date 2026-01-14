import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository, UserWithRelations } from './users.repository';
import { CpfVerificationService } from '../cpf-verification/cpf-verification.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private repository: UsersRepository,
    private cpfVerificationService: CpfVerificationService,
  ) {}

  async create(data: CreateUserDto): Promise<UserWithRelations> {
    const existing = await this.repository.findByEmail(data.email);
    if (existing) throw new ConflictException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { role, ...rest } = data as any;

    this.logger.log(`Creating user with role: ${role}`);

    const user = await this.repository.create({
      ...rest,
      password: hashedPassword,
      birthDate: rest.birthDate ? new Date(rest.birthDate) : null,
      ...(role === 'DRIVER' && {
        driver: {
          create: {
            cnh: rest.cnh,
            cnhExpiration: new Date(rest.cnhExpiration),
            ...(rest.vehicle && {
              vehicles: { create: rest.vehicle },
            }),
          },
        },
      }),
      ...(role === 'PASSENGER' && {
        passenger: { create: {} },
      }),
    });

    if (role === 'PASSENGER' && user.passenger) {
      await this.cpfVerificationService.verifyPassengerCpf(user.passenger.id);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserWithRelations | null> {
    this.logger.log(`Updating user ${id} with data: ${JSON.stringify(data)}`);

    const user = await this.repository.findById(id);
    if (!user) return null;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Remove 'role' de updateData para não enviar ao Prisma (campo não existe no User)
    const { role, ...rest } = data as any;
    const updateData = { ...rest };

    if (updateData.birthDate) {
      updateData.birthDate = new Date(updateData.birthDate);
    }

    if (updateData.address) {
      updateData.address = JSON.parse(JSON.stringify(updateData.address));
    }

    // Se a role for PASSENGER e o usuário ainda não tiver perfil de passageiro, cria explicitamente
    if (role === 'PASSENGER' && !user.passenger) {
      this.logger.log(`Creating passenger profile for user ${id}`);
      try {
        await this.repository.createPassenger(id);
      } catch (e) {
        this.logger.error(`Failed to create passenger for user ${id}`, e);
        // Se falhar (ex: já existe), continuamos para atualizar os outros dados
      }
    }

    // Se a role for DRIVER e o usuário ainda não tiver perfil de motorista, cria
    if (role === 'DRIVER' && !user.driver && (data as any).cnh) {
       this.logger.log(`Creating driver profile for user ${id}`);
       const driverData = data as any;
       updateData.driver = {
          create: {
            cnh: driverData.cnh,
            cnhExpiration: new Date(driverData.cnhExpiration),
            ...(driverData.vehicle && {
              vehicles: { create: driverData.vehicle },
            }),
          },
       };
    }

    let updatedUser: UserWithRelations;
    try {
      updatedUser = await this.repository.update(id, updateData);
    } catch (error) {
      this.logger.error(`Failed to update user ${id}`, error);
      throw error;
    }

    // Verifica CPF se acabou de criar passageiro
    if (role === 'PASSENGER' && !user.passenger) {
       // Recarrega para garantir que temos o passageiro criado
       const refreshedUser = await this.repository.findById(id);
       if (refreshedUser?.passenger) {
         await this.cpfVerificationService.verifyPassengerCpf(refreshedUser.passenger.id);
         // Atualiza o retorno com o status mais recente
         updatedUser = refreshedUser;
       }
    }

    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.repository.findById(id);
    if (!user) return false;

    await this.repository.delete(id);
    return true;
  }

  async findOne(id: string): Promise<UserWithRelations | null> {
    return this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<UserWithRelations | null> {
    return this.repository.findByEmail(email);
  }

  async findAll(): Promise<UserWithRelations[]> {
    return this.repository.findAll();
  }
}
