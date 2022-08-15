import {StringValueObject} from "../../../../Shared/domain/value-object/StringValueObject.ts";

export class UserMail extends StringValueObject{
    constructor(value: string){
        super(value);
    }
    ensureIsValidString(value: string):void{
        if (!value.includes("@")) {
            throw new Error(`"${value}" is not a valid email.`);
        }
    }
}