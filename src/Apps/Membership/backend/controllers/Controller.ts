import {Context} from 'oak/mod.ts';

export interface Controller {
    run(ctx: Context): Promise<void>;
}