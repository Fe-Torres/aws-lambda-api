import { UserDTO } from 'src/model/user/interfaces/userDto';
import { randomUUID } from 'crypto';
import { IUserRepository } from '@models/user/interfaces/IUserRepository'; import { User } from '@models/user/User';
import { ICreateUserUseCase, IFindUserByEmailUseCase } from '../../../model/user/interfaces/IUserUseCase';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private findUserByEmail: IFindUserByEmailUseCase
  ) { }

  async execute(userData: UserDTO): Promise<UserDTO> {
    await this.findUserByEmail.execute(userData.email);
    const userId = this.generateId();
    const user = new User(userId, userData.name, userData.age, userData.email);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  private generateId(): string {
    return randomUUID();
  }
}
