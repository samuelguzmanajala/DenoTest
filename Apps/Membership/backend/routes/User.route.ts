import {Router, Request, Response} from "../../../../dependencies/deps.ts";
import {UserPutController} from "../controllers/UserPutController.ts";
export const register = async(router: Promise<Router>) => {
    const finalRouter = await router;
    const userPutController = new UserPutController();
    finalRouter.put("/user/:id", (ctx) => userPutController.run(ctx));
}