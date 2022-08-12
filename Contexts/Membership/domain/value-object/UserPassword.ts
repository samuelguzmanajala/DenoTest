import { StringValueObject } from "../../../Shared/domain/value-object/StringValueObject.ts";

export class UserPassword extends StringValueObject {
    static readonly MIN_SIZE: number = 8;
    constructor(value: string) {
        super(value);
    }
    ensureIsValidString(value: string): void {
        if (value.length < UserPassword.MIN_SIZE) {
            throw new Error(`"${value}" is not a valid password.`);
        }
    }
}