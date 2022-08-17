import {Router} from "../../../../dependencies/deps.ts";
import {UserPutController} from "../controllers/UserPutController.ts";
import {UserGetController} from "../controllers/UserGetController.ts";

export const register = function (router: Router) {
    const userPutController = new UserPutController();
    const userGetController = new UserGetController();
    router.put('/users/', userPutController.run);
    router.get('/users', userGetController.run);
}