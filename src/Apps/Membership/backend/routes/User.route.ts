import {Router, Context} from "../../../../dependencies/deps.ts";
import {UserPutController} from "../controllers/UserPutController.ts";

export const register = function (router: Router) {
    const userPutController = new UserPutController();
    router.put('/users/:id', async (ctx:Context) => {
        await userPutController.run(ctx);
    });
}