import {UserBackendApp} from "../../../Apps/Membership/backend/UserBackendApp.ts";
import {nodeProcess} from "../../../dependencies/deps.ts"
try{
    new UserBackendApp().start().catch(handleError);
} catch (e) {
    handleError(e);
    nodeProcess.process.exit(1);
}

function handleError(e: Error) {
    console.log(e);
    nodeProcess.process.exit(1);
}
