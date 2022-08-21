import {Controller} from "./Controller.ts";
import {Context} from '../../../../dependencies/deps.ts';

export class StatusGetController implements Controller{
    async run(ctx: Context):Promise<void>{
        ctx.response.status = 200;
    }
}