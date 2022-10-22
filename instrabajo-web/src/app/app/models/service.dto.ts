export interface LoginUserDto {
  username?: string | null;
  password?: string | null;
}

export interface CreateUserDto {
  name?: string | null;
  lastname?: string | null;
  username?: string | null;
  password?: string | null;
  email?: string | null;
  type?: string | null;
}

export interface UpdateUserDto {
  _id?: string;
  phone?: string;
  photo?: string;
}

export interface CompareDto {
  source?: string;
  target?: string;
}

export interface UserDto {
  _id?: string | null;
  name?: string | null;
  lastName?: string | null;
  username?: string | null;
  password?: string | null;
  email?: string | null;
  type?: string | null;
  address?: AddressDto | null;
}

export interface JobDto {
  _id?: string | null;
  name?: string | null;
  description?: string | null;
  skill?: string | null;
  rateType?: string | null;
  hourlyRate?: number | null;
  fixedRate?: number | null;
  status?: string | null;
  images?: string | null;
  address?: string | null;
  employee?: string | null;
  employer?: string | null;
  employeeVerified?: boolean | null;
}

export interface AddressDto {
  _id?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  lat?: string | null;
  lng?: string | null;
}

