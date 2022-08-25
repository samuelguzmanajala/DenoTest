import { CreateUserCommand } from "../../../../../src/Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import { UserIdMother } from "../../Shared/domain/UserId.ts";
import { UserMailMother } from "../domain/UserMailMother.ts";
import { UserNameMother } from "../domain/UserNameMother.ts";
import { UserPasswordMother } from "../domain/UserPasswordMother.ts";

export class CreateUserCommandMother {
  static create(
    id: string,
    name: string,
    password: string,
    mail: string,
  ): CreateUserCommand {
    return new CreateUserCommand({ id, name, password, mail });
  }
  static random(): CreateUserCommand {
    return this.create(
      UserIdMother.random().value,
      UserNameMother.random().value,
      UserPasswordMother.random().value,
      UserMailMother.random().value,
    );
  }
}
