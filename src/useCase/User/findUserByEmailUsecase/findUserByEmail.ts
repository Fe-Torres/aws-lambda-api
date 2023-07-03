import { IUserRepository } from '@models/user/interfaces/IUserRepository'; import { UserDTO } from '../../../model/user/interfaces/userDto';
import { IFindUserByIdUseCase } from '../../../model/user/interfaces/IUserUseCase';

export class FindUserByEmailUseCase implements IFindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(email: string): Promise<UserDTO> {
    const userWithEmailExists = await this.userRepository.findByEmail(email);
    if (userWithEmailExists) {
      throw new Error('Email already exists');
    }
    return;
  }
}
