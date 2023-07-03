import { User } from 'src/model/user/User';
import { IUserRepository } from '@models/user/interfaces/IUserRepository';
import { UserDTO } from '../../model/user/interfaces/userDto';

export class UserRepositoryInMemory implements IUserRepository {

  private users: User[] = [
    {
      id: '123',
      name: 'Teste Parker',
      age: 20,
      email: 'apenasfotografo@gmail.com',
    },
  ];

  async save(user: User): Promise<User> {
    const userExists = await this.findById(user.id);
    if (userExists) {
      throw new Error('User already exists');
    }
    this.users.push(user);
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === userId);
    return user || null;
  }
  async findAll(): Promise<UserDTO[]> {
    return this.users;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async updateById(userID: string, dataToUpdate: UserDTO): Promise<User | null> {
    const user = await this.findById(userID);
    if (!user) {
      return null;
    }
    user.name = dataToUpdate.name;
    user.age = dataToUpdate.age;
    user.email = dataToUpdate.email;
    return user;
  }

  async deleteById(userID: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userID);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
