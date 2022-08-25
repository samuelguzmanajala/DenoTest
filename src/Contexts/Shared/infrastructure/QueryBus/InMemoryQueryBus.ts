import { Query } from "../../domain/Query.ts";
import { QueryBus } from "../../domain/QueryBus.ts";
import { QueryHandlersInformation } from "./QueryHandlersInformation.ts";
import { Response } from "../../domain/Response.ts";

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);
    return handler.handle(query) as Promise<R>;
  }
}
