
import {Controllers} from "./Controllers.ts";
import {Request, Response, Context} from "../../../../dependencies/deps.ts";
import {container} from "../dependency-injection/Container.ts";
import {UserCreator} from "../../../../Contexts/Membership/application/Create/UserCreator.ts";
import {CreateUserCommand} from "../../../../Contexts/Membership/application/Create/CreateUserCommand.ts";
import {CreateUserCommandHandler} from "../../../../Contexts/Membership/application/Create/CreateUserCommandHandler.ts";

export class UserPutController implements Controllers{
    async run(ctx: Context){
        const body = await ctx.request.body();
        const user = await body.value;
        const id: string = user.id;
        const name: string = user.name;
        const password: string = user.password;
        const mail: string = user.mail;
        const createUserCommand = new CreateUserCommand({id, name, password, mail});
        const createUserCommandHandler = new CreateUserCommandHandler(container.get(UserCreator));
        try {
            await createUserCommandHandler.handle(createUserCommand);
            ctx.response.status = 200;
            ctx.response.body = {
                message: "User2 created"
            };
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = {
                message: error.message
            };
        }
    }
}