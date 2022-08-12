import {Controllers} from "../controllers/Controllers.ts";
import {Context} from "../../../../dependencies/deps.ts";

export class UserGetController implements Controllers{
    run(ctx: Context): Promise<void> {
        return Promise.resolve(undefined);
    }
}