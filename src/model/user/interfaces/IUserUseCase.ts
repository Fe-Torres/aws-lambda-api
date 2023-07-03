import { UserDTO } from 'src/model/user/interfaces/userDto';

export interface ICreateUserUseCase {
  execute(userData: UserDTO): Promise<UserDTO>;
}

export interface IFindUserByIdUseCase {
  execute(userId: string): Promise<UserDTO>;
}

export interface IFindUserByEmailUseCase {
  execute(email: string): Promise<UserDTO>;
}
export interface IFindAllUsersUseCase {
  execute(): Promise<UserDTO[]>;
}

export interface IUpdateUserUseCase {
  execute(userId: string, userData: UserDTO): Promise<UserDTO>;
}

export interface IDeleteUserByIdUseCase {
  execute(userId: string): Promise<void>;
}
