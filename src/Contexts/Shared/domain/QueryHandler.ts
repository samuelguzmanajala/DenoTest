import { Query } from './Query.ts';
import { Response } from './Response.ts';

export interface QueryHandler<Q extends Query, R extends Response> {
    subscribedTo(): Query;
    handle(query: Q): Promise<R>;
}
