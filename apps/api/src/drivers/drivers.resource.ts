import { Driver } from '@toinu/shared-types';
import { UsersResource } from '../users/users.resource';

export class DriversResource {
  static format(driver: any): Driver | null {
    if (!driver) return null;
    return {
      id: driver.id,
      userId: driver.userId,
      user: driver.user ? UsersResource.format(driver.user) : undefined,
      trips: driver.trips || [],
    };
  }

  static formatMany(drivers: any[]): Driver[] {
    return drivers.map((driver) => this.format(driver) as Driver);
  }
}
