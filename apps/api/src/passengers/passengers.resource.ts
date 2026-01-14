import { Passenger } from '@toinu/shared-types';
import { UsersResource } from '../users/users.resource';

export class PassengersResource {
  static format(passenger: any): Passenger | null {
    if (!passenger) return null;
    return {
      id: passenger.id,
      userId: passenger.userId,
      // Campos comuns removidos (estão em user)
      status: passenger.status,
      cpfVerified: passenger.cpfVerified,
      cpfVerifiedAt: passenger.cpfVerifiedAt?.toISOString(),
      user: passenger.user ? UsersResource.format(passenger.user) : undefined,
      trips: passenger.trips || [],
      // favoriteAddresses removido daqui pois está em User
      createdAt: passenger.createdAt?.toISOString(),
      updatedAt: passenger.updatedAt?.toISOString(),
    };
  }

  static formatMany(passengers: any[]): Passenger[] {
    return passengers.map((passenger) => this.format(passenger) as Passenger);
  }
}
