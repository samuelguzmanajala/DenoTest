import {Router} from "oak/mod.ts";
import {UserPutController} from "../controllers/UserPutController.ts";
import {UserGetController} from "../controllers/UserGetController.ts";
import {UserDeleteController} from "../controllers/UserDeleteController.ts";

export const register = function (router: Router) {
    const userPutController = new UserPutController();
    const userGetController = new UserGetController();
    const userDeleteController = new UserDeleteController();
    router.put('/users/', userPutController.run);
    router.get('/users', userGetController.run);
    router.delete('/users/', userDeleteController.run);
}