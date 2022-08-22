import {Controller} from "./Controller.ts";
import {User} from "../../../../Contexts/Membership/Users/domain/User.ts";
import {SearchAllUsersQuery} from "../../../../Contexts/Membership/Users/application/searchAll/SearchAllUsersQuery.ts";
import {
    SearchAllUsersQueryHandler
} from "../../../../Contexts/Membership/Users/application/searchAll/SearchAllUsersQueryHandler.ts";
import container from "../dependency-injection/Container.ts";
import {UsersFinder} from "../../../../Contexts/Membership/Users/application/searchAll/UsersFinder.ts";
import {UsersResponse} from "../../../../Contexts/Membership/Users/application/UsersRespone.ts";
import {Context} from "oak/mod.ts";


export class UserGetController implements Controller{
    async run(ctx: Context): Promise<void> {
        const query = new SearchAllUsersQuery();
        const usersHandler: SearchAllUsersQueryHandler = new SearchAllUsersQueryHandler(container.get(UsersFinder));
        const userResponse: UsersResponse = await usersHandler.handle(query);
        ctx.response.headers.set('Access-Control-Allow-Origin', '*');
        ctx.response.status = 200;
        ctx.response.body = userResponse.users.map(user => ({
            id: user.id.value,
            name: user.name.value,
            mail: user.mail.value,
            password: user.password.value
        }));
    }
    private toResponse(users: Array<User>) {
        console.log('entrando');
        return users.map(user => ({
            id: user.id.value,
            name: user.name.value,
            mail: user.mail.value,
            password: user.password.value
        }));
    }

}
