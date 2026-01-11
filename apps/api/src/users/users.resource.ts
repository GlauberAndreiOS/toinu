import { User } from '@toinu/shared-types';

export class UsersResource {
  static format(user: any): User | null {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
      driver: user.driver
        ? {
            id: user.driver.id,
            userId: user.driver.userId,
            fullName: user.driver.fullName,
            birthDate: user.driver.birthDate?.toISOString(),
            cpf: user.driver.cpf,
            phoneContact: user.driver.phoneContact,
            emailContact: user.driver.emailContact,
            cnh: user.driver.cnh,
            cnhExpiration: user.driver.cnhExpiration?.toISOString(),
            address: user.driver.address || undefined,
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
                }))
              : [],
          }
        : undefined,
      passenger: user.passenger
        ? {
            id: user.passenger.id,
            userId: user.passenger.userId,
            fullName: user.passenger.fullName,
            cpf: user.passenger.cpf,
            birthDate: user.passenger.birthDate?.toISOString(),
            phoneContact: user.passenger.phoneContact,
            status: user.passenger.status,
            cpfVerified: user.passenger.cpfVerified,
            cpfVerifiedAt: user.passenger.cpfVerifiedAt?.toISOString(),
            address: user.passenger.address || undefined,
            favoriteAddresses: user.passenger.favoriteAddresses || [],
          }
        : undefined,
    };
  }

  static formatMany(users: any[]): User[] {
    return users.map((user) => this.format(user) as User);
  }
}
