import { StringValueObject } from "../../../../Shared/domain/value-object/StringValueObject.ts";

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
  ensureIsValidString(value: string): void {
    if (!value.length) {
      throw new Error(`"${value}" is not a valid username.`);
    }
  }
}
