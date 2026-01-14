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

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  email?: string;
  fullName?: string;
  phone?: string;
  password?: string;
  birthDate?: string; // Adicionado
  cpf?: string; // Adicionado
  address?: Address; // Adicionado
  oauthProvider?: string;
  oauthProviderId?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: UserRole;
  driver?: Driver;
  passenger?: Passenger;
  favoriteAddresses?: PassengerFavoriteAddress[]; // Movido para User (opcional, pois no banco é User -> FavoriteAddress)
}

export interface Driver {
  id: string;
  userId: string;
  // Campos comuns removidos (estão em User)
  cnh: string;
  cnhExpiration: string;
  isApproved: boolean;
  user?: User;
  trips?: Trip[];
  vehicles?: Vehicle[];
  createdAt?: string;
  updatedAt?: string;
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
  // Campos comuns removidos (estão em User)
  status: PassengerStatus;
  cpfVerified: boolean;
  cpfVerifiedAt?: string;
  user?: User;
  trips?: Trip[];
  // favoriteAddresses removido daqui pois está em User no banco, mas mantido em User interface
  createdAt?: string;
  updatedAt?: string;
}

export interface PassengerFavoriteAddress {
  id: string;
  passengerId?: string; // Opcional ou removido, pois agora está ligado ao User (userId)
  userId?: string; // Adicionado para refletir o banco
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
  birthDate?: string;
  cpf?: string;
  address?: Address;
}

export interface UpdateUserPayload {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  birthDate?: string;
  cpf?: string;
  address?: Address;
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
