import {UserRepository} from "../../domain/UserRepository.ts";
import {UsersResponse} from "../UsersRespone.ts";
import {Service} from 'di/mod.ts';
import {UserId} from "../../domain/value-object/UserId.ts";

@Service()
export class UserRemover {
  constructor(private userRepository: UserRepository) {}
  async run(userId: UserId) {
    await this.userRepository.delete(userId);
  }
}