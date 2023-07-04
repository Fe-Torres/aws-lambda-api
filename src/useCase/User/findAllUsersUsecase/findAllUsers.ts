import { IUserRepository } from '@models/user/interfaces/IUserRepository'; import { UserDTO } from '../../../model/user/interfaces/userDto';
import { IFindAllUsersUseCase } from '../../../model/user/interfaces/IUserUseCase';

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
