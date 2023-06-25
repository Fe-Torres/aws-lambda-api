import { User } from "src/model/user/User";
import { IUserRepository } from "src/model/user/interfaces/IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [
      { id: "123", name: "Teste Parker", age: 20, email: "apenasfotografo@gmail.com" }
    ];
  }

  async save(user: User): Promise<User> {
    const userExists = await this.findById(user.id)
    if (userExists) {
      throw new Error("User alredy exists");
    }
    this.users.push(user);
    return user;
  }

  async findById(userID: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === userID);
    return user || null;
  }
}
