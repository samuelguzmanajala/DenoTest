import Logger from "../../../Contexts/Shared/domain/Logger.ts";
import {Application, Router} from "../../../dependencies/deps.ts"
import container from "./dependency-injection/Container.ts";
import {registerRoutes} from "./routes/index.ts";
import {oakCors} from "../../../dependencies/deps.ts";
import {Context} from '../../../dependencies/deps.ts';


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
  }

  async listen() {
    this.application.use(async (ctx: Context, next) => {
      await next();
      const reqBodyRaw = ctx.request.body({type: "json"});
      const reqBody = await reqBodyRaw.value;
      this.logger.info(`${ctx.request.method} ${ctx.request.url.searchParams} ${JSON.stringify(reqBody)}`);
      console.log(3);
      //ctx.assert(reqBody.data, 400);
    });
    console.log('listenining on port ' + this.port);
    return await this.application.listen({port: Number(this.port)});
  }
}