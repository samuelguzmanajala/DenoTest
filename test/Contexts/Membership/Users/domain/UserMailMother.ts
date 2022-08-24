import { UserMail } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserMail.ts";
import { MailMother } from "../../../Shared/domain/MailMother.ts";

export class UserMailMother{
    static create(value: string):UserMail{
        return new UserMail(value);
    }
    
    static random(): UserMail {
        return this.create(MailMother.random());
    }
}