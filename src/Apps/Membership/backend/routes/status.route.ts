import {Router} from "https://deno.land/x/oak@v10.6.0/router.ts";
import {StatusGetController} from "../controllers/StatusGetController.ts";

export const register = function (router: Router) {
  const statusGetController = new StatusGetController();
  router.get('/status', statusGetController.run);
}