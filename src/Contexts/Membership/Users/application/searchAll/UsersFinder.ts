import {UserRepository} from "../../domain/UserRepository.ts";
import {UsersResponse} from "../UsersRespone.ts";
import {Service} from "../../../../../dependencies/deps.ts";

@Service()
export class UsersFinder {
    constructor(private userRepository: UserRepository) {}
    async run() {
        const users = await this.userRepository.searchAll();
        return new UsersResponse(users);
    }
}