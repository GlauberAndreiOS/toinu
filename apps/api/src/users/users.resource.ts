import { User, UserRole, PassengerStatus } from '@toinu/shared-types';
import { UserWithRelations } from './users.repository';

export class UsersResource {
  static format(user: UserWithRelations | null): User | null {
    if (!user) return null;

    // Helper para formatar endereço se existir
    const formatAddress = (addr: any) => {
      if (!addr) return undefined;
      // Se for string (JSON do banco), faz parse, senão usa direto
      return typeof addr === 'string' ? JSON.parse(addr) : addr;
    };

    return {
      id: user.id,
      email: user.email || undefined,
      fullName: user.fullName || undefined,
      phone: user.phone || undefined,
      birthDate: user.birthDate?.toISOString(),
      cpf: user.cpf || undefined,
      address: formatAddress(user.address),
      oauthProvider: user.oauthProvider || undefined,
      oauthProviderId: user.oauthProviderId || undefined,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),

      // Define role baseado na existência de driver/passenger ou padrão
      role: user.driver ? UserRole.DRIVER : (user.passenger ? UserRole.PASSENGER : undefined),

      driver: user.driver
        ? {
            id: user.driver.id,
            userId: user.driver.userId,

            // Campos específicos do Driver
            cnh: user.driver.cnh,
            cnhExpiration: user.driver.cnhExpiration?.toISOString(),
            isApproved: user.driver.isApproved,
            vehicles: user.driver.vehicles
              ? user.driver.vehicles.map((v: any) => ({
                  id: v.id,
                  driverId: v.driverId,
                  brand: v.brand,
                  model: v.model,
                  yearOfManufacture: v.yearOfManufacture,
                  yearOfModel: v.yearOfModel,
                  renavam: v.renavam,
                  licensePlate: v.licensePlate,
                  color: v.color,
                  isActive: v.isActive,
                  createdAt: v.createdAt?.toISOString(),
                  updatedAt: v.updatedAt?.toISOString(),
                }))
              : [],
            createdAt: user.driver.createdAt?.toISOString(),
            updatedAt: user.driver.updatedAt?.toISOString(),
          }
        : undefined,

      passenger: user.passenger
        ? {
            id: user.passenger.id,
            userId: user.passenger.userId,

            // Campos específicos do Passenger
            status: user.passenger.status as unknown as PassengerStatus,
            cpfVerified: user.passenger.cpfVerified,
            cpfVerifiedAt: user.passenger.cpfVerifiedAt?.toISOString(),

            createdAt: user.passenger.createdAt?.toISOString(),
            updatedAt: user.passenger.updatedAt?.toISOString(),
          }
        : undefined,

      favoriteAddresses: user.favoriteAddresses
        ? user.favoriteAddresses.map((addr) => ({
            id: addr.id,
            userId: user.id,
            label: addr.label,
            street: addr.street,
            number: addr.number,
            complement: addr.complement || undefined,
            neighborhood: addr.neighborhood,
            city: addr.city,
            state: addr.state,
            zipCode: addr.zipCode,
            latitude: addr.latitude || undefined,
            longitude: addr.longitude || undefined,
            createdAt: addr.createdAt.toISOString(),
            updatedAt: addr.updatedAt.toISOString(),
          }))
        : [],
    };
  }

  static formatMany(users: UserWithRelations[]): User[] {
    return users.map((user) => this.format(user) as User);
  }
}
