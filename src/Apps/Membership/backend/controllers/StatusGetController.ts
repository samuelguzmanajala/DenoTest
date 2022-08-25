import { Controller } from "./Controller.ts";
import { Context } from "oak/mod.ts";

export class StatusGetController implements Controller {
  async run(ctx: Context): Promise<void> {
    ctx.response.status = 200;
    return await new Promise((resolve) => {
      resolve();
    });
  }
}
