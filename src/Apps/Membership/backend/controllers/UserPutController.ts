import {helpers} from '../../../../dependencies/deps.ts';
import {Controllers} from "./Controllers.ts";
import {CreateUserCommand} from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import {
    CreateUserCommandHandler
} from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommandHandler.ts";
import container from "../dependency-injection/Container.ts";
import {UserCreator} from "../../../../Contexts/Membership/Users/application/Create/UserCreator.ts";
import {Context} from '../../../../dependencies/deps.ts';
import { ERR_CONSOLE_WRITABLE_STREAM } from 'https://deno.land/std@0.152.0/node/internal/errors.ts';

type UserBody = {
    id: string;
    name: string;
    mail: string;
    password: string;
}

export class UserPutController implements Controllers{
    async run(ctx: Context):Promise<void>{
        const requestBody = ctx.request.body({
            contentTypes: {
                json: ['application/json'],
                form: [ 'multipart', 'urlencoded'],
                text: ['text']
            }
        });
        const body:any = await requestBody.value;
        const params = helpers.getQuery(ctx, {mergeParams: true});
        const user: UserBody = {...(body as UserBody), id: params.id};
        const createUserCommand: CreateUserCommand = new CreateUserCommand({...user});
        const createUserCommandHandler: CreateUserCommandHandler = new CreateUserCommandHandler(container.get(UserCreator));
        try{
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
        /*
        console.log(params);
        const user1 = body as UserBody;
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
        */
    }
}