import { Passenger } from '@toinu/shared-types';
import { UsersResource } from '../users/users.resource';

export class PassengersResource {
  static format(passenger: any): Passenger | null {
    if (!passenger) return null;
    return {
      id: passenger.id,
      userId: passenger.userId,
      fullName: passenger.fullName,
      cpf: passenger.cpf,
      birthDate: passenger.birthDate?.toISOString(),
      phoneContact: passenger.phoneContact,
      status: passenger.status,
      cpfVerified: passenger.cpfVerified,
      cpfVerifiedAt: passenger.cpfVerifiedAt?.toISOString(),
      address: passenger.address,
      user: passenger.user ? UsersResource.format(passenger.user) : undefined,
      trips: passenger.trips || [],
      favoriteAddresses: passenger.favoriteAddresses || [],
    };
  }

  static formatMany(passengers: any[]): Passenger[] {
    return passengers.map((passenger) => this.format(passenger) as Passenger);
  }
}
