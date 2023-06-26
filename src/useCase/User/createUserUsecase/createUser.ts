import { UserDTO } from 'src/model/user/interfaces/userDto';
import { randomUUID } from 'crypto';
import { IUserRepository } from 'src/model/user/interfaces/IUserRepository';
import { User } from 'src/model/user/User';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(userData: UserDTO): Promise<User> {
    const userId = this.generateId();
    const user = new User(userId, userData.name, userData.age, userData.email);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  private generateId(): string {
    return randomUUID();
  }
}

