import { IUserRepository } from 'src/model/user/interfaces/IUserRepository';
import { User } from 'src/model/user/User';

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

}

