import { UserDTO } from 'src/model/user/interfaces/userDto';
import { IUserRepository } from '@models/user/interfaces/IUserRepository'; import { User } from '@models/user/User';
import { IFindUserByEmailUseCase, IFindUserByIdUseCase, IUpdateUserUseCase } from '../../../model/user/interfaces/IUserUseCase';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private findByEmail: IFindUserByEmailUseCase,
    private findById: IFindUserByIdUseCase
  ) { }

  async execute(userId: string, userData: UserDTO): Promise<UserDTO> {
    await this.findById.execute(userId);
    await this.findByEmail.execute(userData.email);
    const user = new User(userId, userData.name, userData.age, userData.email);
    const savedUser = await this.userRepository.updateById(userId, user);
    return savedUser;
  }
}
