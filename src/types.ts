// Tipos que correspondem ao backend
export type UserRole = 'admin' | 'patient';

export interface UserPublic {
  id: number;
  email: string;
  name: string;
  phone?: string;
  date_of_birth?: string;
  cpf?: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  duration_minutes: number;
  price: number;
  category?: string;
}

export interface Dentist {
    id: number;
    name: string;
    cro: string;
    specialties?: string;
}