import { IUserRepository } from '@models/user/interfaces/IUserRepository';
import { UserDTO } from '../../../model/user/interfaces/userDto';
import { IFindUserByIdUseCase } from '../../../model/user/interfaces/IUserUseCase';

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
