import { UserName } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserName.ts";
import { WordMother } from "../../../Shared/domain/WordMother.ts";

export class UserNameMother {
  static create(value: string): UserName {
    return new UserName(value);
  }
  static random(): UserName {
    return this.create(WordMother.random());
  }
}
