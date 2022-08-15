import {Command} from "../../../../Shared/domain/Command.ts";


type Params = {
    id: string;
    name: string;
    password: string;
    mail: string;
};

export class CreateUserCommand extends Command {
    id: string;
    name: string;
    password: string;
    mail: string;

    constructor({ id, name, password, mail }: Params) {
        super();
        this.id = id;
        this.name = name;
        this.password = password;
        this.mail = mail;
    }
}
