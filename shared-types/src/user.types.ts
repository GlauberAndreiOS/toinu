export interface User {
  id: string
  email: string
  name: string
}

export interface CreateUserPayload {
  email: string
  password: string
  name: string
}

export interface UpdateUserPayload {
  email: string,
  password: string
  name: string
}

export interface DeleteUserPayload {
  email: string
  password: string
  name: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: User
}
