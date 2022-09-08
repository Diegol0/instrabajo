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

export interface UpdateUserBreedDto {
  _id?: string | null;
  type?: string | null;
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

export interface AddressDto {
  _id?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  lat?: string | null;
  lng?: string | null;
}

export interface JobDto {
  _id?: string | null;
  name?: string | null;
  rate?: string | null;
  image?: string | null;
  employerId?: string | null;
  address?: AddressDto | null;
}
