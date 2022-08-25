import { StringValueObject } from "../../../../Shared/domain/value-object/StringValueObject.ts";

export class UserMail extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
  ensureIsValidString(value: string): void {
    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!validMailRegex.exec(value)){
      throw new Error(`"${value}" is not a valid email.`);
    }
  }
}
