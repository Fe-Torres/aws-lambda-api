import { IUserRepository } from '@models/user/interfaces/IUserRepository'; import { IFindUserByIdUseCase } from '../../../model/user/interfaces/IUserUseCase';

export class DeleteUserByIdUseCase {
  constructor(
    private userRepository: IUserRepository,
    private findUserById: IFindUserByIdUseCase
  ) { }

  async execute(userId: string) {
    await this.findUserById.execute(userId);
    await this.userRepository.deleteById(userId);
    return;
  }
}
