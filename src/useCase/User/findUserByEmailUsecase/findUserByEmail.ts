import { UserDTO } from '../../../model/user/interfaces/userDto';
import { IFindUserByIdUseCase } from '../../../model/user/interfaces/IUserUseCase';
import { IUserRepository } from '../../../model/user/interfaces/IUserRepository';
import { ConflictApplicationError } from '../../../main/errors/conflictError';

export class FindUserByEmailUseCase implements IFindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<UserDTO> {
    const userWithEmailExists = await this.userRepository.findByEmail(email);
    if (userWithEmailExists) {
      throw new ConflictApplicationError('Email already exists');
    }
    return;
  }
}
