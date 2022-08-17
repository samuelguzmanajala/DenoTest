import {Controllers} from "../controllers/Controllers.ts";
import {User} from "../../../../Contexts/Membership/Users/domain/User.ts";
import {SearchAllUsersQuery} from "../../../../Contexts/Membership/Users/application/searchAll/SearchAllUsersQuery.ts";
import {
    SearchAllUsersQueryHandler
} from "../../../../Contexts/Membership/Users/application/searchAll/SearchAllUsersQueryHandler.ts";
import container from "../dependency-injection/Container.ts";
import {UsersFinder} from "../../../../Contexts/Membership/Users/application/searchAll/UsersFinder.ts";
import {UsersResponse} from "../../../../Contexts/Membership/Users/application/UsersRespone.ts";
//import {Context} from "../../../../dependencies/deps.ts";


export class UserGetController implements Controllers{
    async run(ctx: any): Promise<void> {
        const query = new SearchAllUsersQuery();
        const usersHandler: SearchAllUsersQueryHandler = new SearchAllUsersQueryHandler(container.get(UsersFinder));
        const userResponse: UsersResponse = await usersHandler.handle(query);
        ctx.response.headers.set('Access-Control-Allow-Origin', '*');
        ctx.response.status = 200;
        console.log(userResponse.users);
        ctx.response.body = this.toResponse(userResponse.users);
    }

    private toResponse(users: Array<User>) {
        return users.map(user => ({
            id: user.id,
            name: user.name,
            mail: user.mail,
            password: user.password
        }));
    }

}
