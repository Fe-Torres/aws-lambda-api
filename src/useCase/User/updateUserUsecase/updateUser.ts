import { UserDTO } from 'src/model/user/interfaces/userDto';
import { IUserRepository } from '@models/user/interfaces/IUserRepository';

import {
  IFindUserByEmailUseCase,
  IFindUserByIdUseCase,
  IUpdateUserUseCase,
} from '../../../model/user/interfaces/IUserUseCase';
import { User } from '../../../model/user/User';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private findByEmail: IFindUserByEmailUseCase,
    private findById: IFindUserByIdUseCase
  ) {}

  async execute(userId: string, userData: UserDTO): Promise<UserDTO> {
    const userExists = await this.findById.execute(userId);
    await this.verifyIfExistsEmail(userExists, userData);
    const user = new User(userId, userData.name, userData.age, userData.email);
    const updatedUser = await this.userRepository.updateById(userId, user);
    return updatedUser;
  }
  async verifyIfExistsEmail(userExists: UserDTO, userData: UserDTO) {
    // Verifica a existência do e-mail que ele deseja alterar
    if (userExists.email !== userData.email) {
      await this.findByEmail.execute(userData.email);
    }
  }
}
