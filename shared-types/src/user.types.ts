export enum UserRole {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
  driver?: Driver;
  passenger?: Passenger;
}

export interface Driver {
  id: string;
  userId: string;
  user?: User;
  trips?: Trip[];
}

export interface Passenger {
  id: string;
  userId: string;
  user?: User;
  trips?: Trip[];
}

export interface Trip {
  id: string;
  driverId: string;
  passengerId: string;
  origin: string;
  destination: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface DeleteUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
