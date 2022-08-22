//import {UserBackendApp} from "../../../Apps/Membership/backend/UserBackendApp.ts";
import {Context, Application, Router} from 'oak/mod.ts';
import {oakCors} from 'oakCors/mod.ts'
import Logger from "../../../Contexts/Shared/domain/Logger.ts";
import container from "./dependency-injection/Container.ts";
import { registerRoutes } from "./routes/routes.ts";

//import * as nodeProcess from "nodeProcess"
/*
try{
    const backendApp: UserBackendApp = new UserBackendApp();
    backendApp.start().catch(handleError);
} catch (e) {
    handleError(e);
    nodeProcess.process.exit(1);
}

function handleError(e: Error) {
    console.log(e);
    nodeProcess.process.exit(1);
}

*/

/*

import {Application, Context} from "oak/mod.ts";

const app = new Application();
app.use((ctx:Context) => {
  ctx.response.body = "Hello World! from index";
});
await app.listen({port: 3000});
*/
const port = 3000;
//const logger = container.get(Logger);
const application = new Application();
//application.use(oakCors());
const router = new Router();
//registerRoutes(router);
application.use(router.routes());
application.use(router.allowedMethods());
/*
router.use( async (ctx: Context, next)=> {
    try{
    await next();
    logger.success(`${ctx.request.method} ${ctx.request.url.pathname}`);
    }catch(err){
    logger.error(err.message);
    ctx.response.status = err.status || 500;
    ctx.response.type = 'json';
    ctx.response.body = {
        message: err.message
    };
    }
});
*/


application.addEventListener("error", (error) => {
    console.log('error', error);
  });
  application.addEventListener("listen", () => {
    console.log(`  Backend App is running at http://localhost:${port}`);
    console.log('  Press CTRL-C to stop\n');
  });
  await application.listen({port: Number(port)});