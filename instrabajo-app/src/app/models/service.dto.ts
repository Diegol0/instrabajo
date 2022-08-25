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
}
