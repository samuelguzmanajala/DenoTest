import { UserPassword } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserPassword.ts";
import { PasswordMother } from "../../../Shared/domain/PasswordMother.ts";

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value);
  }
  static random(): UserPassword {
    return this.create(PasswordMother.random());
  }
}
