import {UserBackendApp} from "../../../Apps/Membership/backend/UserBackendApp.ts";
import * as nodeProcess from "nodeProcess"
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
