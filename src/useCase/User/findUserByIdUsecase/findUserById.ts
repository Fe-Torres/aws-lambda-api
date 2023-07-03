import { IUserRepository } from 'src/model/user/interfaces/IUserRepository';
import { UserDTO } from '../../../model/user/interfaces/userDto';

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
