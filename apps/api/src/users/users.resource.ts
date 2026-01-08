import { User } from '@toinu/shared-types';

export class UsersResource {
  static format(user: any): User | null {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt?.toISOString(),
      driver: user.driver
        ? {
            id: user.driver.id,
            userId: user.driver.userId,
          }
        : undefined,
      passenger: user.passenger
        ? {
            id: user.passenger.id,
            userId: user.passenger.userId,
          }
        : undefined,
    };
  }

  static formatMany(users: any[]): User[] {
    return users.map((user) => this.format(user) as User);
  }
}
