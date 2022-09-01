import { Uuid } from "../../../Shared/domain/value-object/Uuid.ts";
import { EmailAddress } from "./EmailAddress.ts";
import { EmailId } from "./EmailId.ts";

type ConstructorParams ={
    id?:EmailId;
    from: EmailAddress;
    to: EmailAddress;
    subject: string;
    body: string;
}

export class Email{
    readonly id: EmailId;
    readonly from: EmailAddress;
    readonly to: EmailAddress;
    readonly subject: string;
    readonly body: string;

    constructor(params:ConstructorParams){
        this.id= params.id || new EmailId(Uuid.random().value);
        this.from = params.from;
        this.to = params.to;
        this.subject = params.subject;
        this.body = params.body;
    }
    
}