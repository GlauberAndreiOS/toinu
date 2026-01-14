import { Driver } from '@toinu/shared-types';
import { UsersResource } from '../users/users.resource';

export class DriversResource {
  static format(driver: any): Driver | null {
    if (!driver) return null;
    return {
      id: driver.id,
      userId: driver.userId,
      // Campos comuns removidos (estão em user)
      cnh: driver.cnh,
      cnhExpiration: driver.cnhExpiration?.toISOString(),
      isApproved: driver.isApproved,
      user: driver.user ? UsersResource.format(driver.user) : undefined,
      trips: driver.trips || [],
      vehicles: driver.vehicles
        ? driver.vehicles.map((v: any) => ({
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
      createdAt: driver.createdAt?.toISOString(),
      updatedAt: driver.updatedAt?.toISOString(),
    };
  }

  static formatMany(drivers: any[]): Driver[] {
    return drivers.map((driver) => this.format(driver) as Driver);
  }
}
