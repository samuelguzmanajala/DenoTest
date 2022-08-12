import Logger from "../../../Contexts/Shared/domain/Logger.ts";
import {Application, Context, Router} from "../../../dependencies/deps.ts"
import {registerRoutes} from "./routes/RegisterRoutes.ts";
import {container} from "./dependency-injection/Container.ts";

export class Server {
    private readonly port: string;
    private logger: Logger;
    private application: Application;

    constructor(port: string) {
        this.port = port;
        this.logger = container.get(Logger);
        this.application = new Application({logErrors:false});
        this.application.use( async (ctx: Context) => {
            this.logger.info(`   Membership Backend App is running at http://localhost:${this.port}`);
            this.logger.info(`   Press CTRL-C to stop\n`);
            const reqBodyRaw = ctx.request.body({type: "json"});
            const reqBody = await reqBodyRaw.value;
            ctx.assert(reqBody.data, 400, "Data is missing");
        });
        const router = new Router();
        this.application.use(router.routes());
        this.application.use(router.allowedMethods());
        registerRoutes(router);
        router.use(async (ctx:Context, next) => {
            try {
                await next();
            } catch (err) {
                this.logger.error(err);
                ctx.response.status = 500;
                ctx.response.body = {message: err.message};
            }
        });
    }

    listen(): Promise<void> {
        return this.application.listen({port:Number(this.port)});
    }
}