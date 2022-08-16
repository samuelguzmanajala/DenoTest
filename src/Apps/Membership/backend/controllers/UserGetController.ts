import {Controllers} from "../controllers/Controllers.ts";
import {Context} from "../../../../dependencies/deps.ts";
import {User} from "../../../../Contexts/Membership/Users/domain/User.ts";

export class UserGetController implements Controllers{
    async run(ctx: any): Promise<void> {
        const params = ctx.params;
        console.log('params', params);
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
