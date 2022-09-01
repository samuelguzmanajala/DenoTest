import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject.ts";

export class EmailAddress extends StringValueObject {
  ensureIsValidString(value: string): void {
  }
}
