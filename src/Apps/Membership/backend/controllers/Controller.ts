import {Context} from '../../../../dependencies/deps.ts';

export interface Controller {
    run(ctx: Context): Promise<void>;
}