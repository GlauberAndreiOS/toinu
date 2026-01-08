import { Passenger } from '@toinu/shared-types';
import { UsersResource } from '../users/users.resource';

export class PassengersResource {
  static format(passenger: any): Passenger | null {
    if (!passenger) return null;
    return {
      id: passenger.id,
      userId: passenger.userId,
      user: passenger.user ? UsersResource.format(passenger.user) : undefined,
      trips: passenger.trips || [],
    };
  }

  static formatMany(passengers: any[]): Passenger[] {
    return passengers.map((passenger) => this.format(passenger) as Passenger);
  }
}
