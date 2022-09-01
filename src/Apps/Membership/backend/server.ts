import Logger from "../../../Contexts/Shared/domain/Logger.ts";
import container from "./dependency-injection/Container.ts";
import { registerRoutes } from "./routes/routes.ts";
import { oakCors } from "oakCors/mod.ts";
import { Application, Context, Router } from "oak/mod.ts";

export class Server {
  private readonly port: string;
  private logger: Logger;
  private application: Application;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get(Logger);
    this.application = new Application();
    this.application.use(oakCors());
    const router = new Router();
    registerRoutes(router);
    this.application.use(router.routes());
    this.application.use(router.allowedMethods());
    router.use(async (ctx: Context, next) => {
      try {
        await next();
        this.logger.success(
          `${ctx.request.method} ${ctx.request.url.pathname}`,
        );
      } catch (err) {
        this.logger.error(err.message);
        ctx.response.status = err.status || 500;
        ctx.response.type = "json";
        ctx.response.body = {
          message: err.message,
        };
      }
    });
  }

  async listen() {
    this.application.addEventListener("error", (error) => {
      this.logger.error(error.message);
    });
    this.application.addEventListener("listen", () => {
      this.logger.info(
        `  Backend App is running at http://localhost:${this.port}`,
      );
      this.logger.info("  Press CTRL-C to stop\n");
    });
    return await this.application.listen({ port: Number(this.port) });
  }
}
