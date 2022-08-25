import { Query } from "./Query.ts";
import { Response } from "./Response.ts";

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}
