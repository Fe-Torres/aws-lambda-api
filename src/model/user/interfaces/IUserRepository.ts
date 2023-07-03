import { User } from '../User';
import { UserDTO } from './userDto';

export interface IUserRepository {
  save(user: User): Promise<UserDTO>;
  findById(userID: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  updateById(userID: string, dataToUpdate: UserDTO): Promise<UserDTO | null>;
  deleteById(userID: string): Promise<void>;
}
