import { Request, Response, Context } from "../../../../dependencies/deps.ts";
export interface Controllers {
    run(ctx: Context): Promise<void>;
}