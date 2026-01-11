import { Vehicle } from '@toinu/shared-types';

export class VehiclesResource {
  static format(vehicle: any): Vehicle | null {
    if (!vehicle) return null;
    return {
      id: vehicle.id,
      driverId: vehicle.driverId,
      brand: vehicle.brand,
      model: vehicle.model,
      yearOfManufacture: vehicle.yearOfManufacture,
      yearOfModel: vehicle.yearOfModel,
      renavam: vehicle.renavam,
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      isActive: vehicle.isActive,
      createdAt: vehicle.createdAt?.toISOString(),
      updatedAt: vehicle.updatedAt?.toISOString(),
    };
  }

  static formatMany(vehicles: any[]): Vehicle[] {
    return vehicles.map((vehicle) => this.format(vehicle) as Vehicle);
  }
}
