import { User } from '../User';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(userID: string): Promise<User | null>;
}
