import { Router } from "oak/mod.ts";
import { StatusGetController } from "../controllers/StatusGetController.ts";

export const register = function (router: Router) {
  const statusGetController = new StatusGetController();
  router.get("/status", statusGetController.run);
  router.get("", statusGetController.run);
};
