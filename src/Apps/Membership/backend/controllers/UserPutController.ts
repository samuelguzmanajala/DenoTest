import {helpers} from '../../../../dependencies/deps.ts';
import {Controller} from "./Controller.ts";
import {CreateUserCommand} from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import {
    CreateUserCommandHandler
} from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommandHandler.ts";
import container from "../dependency-injection/Container.ts";
import {UserCreator} from "../../../../Contexts/Membership/Users/application/Create/UserCreator.ts";
import {Context} from '../../../../dependencies/deps.ts';

type UserBody = {
    id: string;
    name: string;
    mail: string;
    password: string;
}

export class UserPutController implements Controller{
    async run(ctx: Context):Promise<void>{
        console.log('UserPutController.run');
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
        await createUserCommandHandler.handle(createUserCommand);
        ctx.response.status = 200;
    }
}