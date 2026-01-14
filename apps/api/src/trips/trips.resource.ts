import { Trip, TripStatus } from '@toinu/shared-types';

export class TripsResource {
  static format(trip: any): Trip | null {
    if (!trip) return null;
    return {
      id: trip.id,
      driverId: trip.driverId,
      passengerId: trip.passengerId,
      origin: trip.origin,
      destination: trip.destination,
      status: trip.status as unknown as TripStatus,
      createdAt: trip.createdAt?.toISOString(),
      updatedAt: trip.updatedAt?.toISOString(),
    };
  }

  static formatMany(trips: any[]): Trip[] {
    return trips.map((trip) => this.format(trip) as Trip);
  }
}
