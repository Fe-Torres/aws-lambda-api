import { User } from '../User';
import { UserDTO } from './userDto';

export interface IUserRepository {
  save(user: User): Promise<UserDTO>;
  findById(userID: string): Promise<UserDTO | null>;
}
