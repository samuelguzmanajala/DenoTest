import {Router, Context} from "../../../../dependencies/deps.ts";
import {UserPutController} from "../controllers/UserPutController.ts";
import {UserGetController} from "../controllers/UserGetController.ts";

export const register = function (router: Router) {
    const userPutController = new UserPutController();
    const userGetController = new UserGetController();
    router.put('/users/:id', async (ctx) => {
        await userPutController.run(ctx);
    });
    router.get('/users', async (ctx) => {
        await userGetController.run(ctx);
    });
}