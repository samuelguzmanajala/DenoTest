
import {Context} from '../../../../dependencies/deps.ts';
import {Controllers} from "./Controllers.ts";
import {CreateUserCommand} from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import {
    CreateUserCommandHandler
} from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommandHandler.ts";
import container from "../dependency-injection/Container.ts";
import {UserCreator} from "../../../../Contexts/Membership/Users/application/Create/UserCreator.ts";

interface UserBody {
    name: string;
    mail: string;
    password: string;
}

export class UserPutController implements Controllers{
    async run(ctx: any): Promise<void> {
        const body = await ctx.request.body().value;
        const user = body as UserBody;
        console.log('user', user);
        const id: string = ctx.params.id;
        const name: string = user.name;
        const password: string = user.password;
        const mail: string = user.mail;
        const createUserCommand = new CreateUserCommand({id, name, password, mail});
        const createUserCommandHandler = new CreateUserCommandHandler(container.get(UserCreator));
        try {
            await createUserCommandHandler.handle(createUserCommand);
            ctx.response.status = 200;
            ctx.response.body = {
                message: "User created"
            };
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = {
                message: error.message
            };
        }
    }
}