export enum UserRole {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

export enum PassengerStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum TripStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum CpfVerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ERROR = 'ERROR',
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  password?: string;
  oauthProvider?: string;
  oauthProviderId?: string;
  createdAt?: string;
  updatedAt?: string;
  driver?: Driver;
  passenger?: Passenger;
}

export interface Driver {
  id: string;
  userId: string;
  fullName: string;
  birthDate: string;
  cpf: string;
  phoneContact?: string;
  emailContact?: string;
  cnh: string;
  cnhExpiration: string;
  address?: Address;
  isApproved: boolean;
  user?: User;
  trips?: Trip[];
  vehicles?: Vehicle[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Vehicle {
  id: string;
  driverId: string;
  brand: string;
  model: string;
  yearOfManufacture: number;
  yearOfModel: number;
  renavam: string;
  licensePlate: string;
  color: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Passenger {
  id: string;
  userId: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  phoneContact?: string;
  status: PassengerStatus;
  cpfVerified: boolean;
  cpfVerifiedAt?: string;
  address?: Address;
  user?: User;
  trips?: Trip[];
  favoriteAddresses?: PassengerFavoriteAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PassengerFavoriteAddress {
  id: string;
  passengerId: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Trip {
  id: string;
  driverId: string;
  passengerId: string;
  origin: string;
  destination: string;
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
}

export interface DeleteUserPayload {
  id: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
