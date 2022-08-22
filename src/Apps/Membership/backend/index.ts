import {UserBackendApp} from "../../../Apps/Membership/backend/UserBackendApp.ts";

const backendApp: UserBackendApp = new UserBackendApp();
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

import {Application, Context} from "oak/mod.ts";

const app = new Application();
app.use((ctx:Context) => {
  ctx.response.body = "Hello World! from index";
});
await app.listen({port: 3000});