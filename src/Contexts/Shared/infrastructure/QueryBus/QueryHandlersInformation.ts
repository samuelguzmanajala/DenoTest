import { Query } from "../../domain/Query.ts";
import { QueryHandler } from "../../domain/QueryHandler.ts";
import { QueryNotRegisteredError } from "../../domain/QueryNotRegisteredError.ts";
import { Response } from "../../domain/Response.ts";

export class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, Response>>;

  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, Response>>,
  ): Map<Query, QueryHandler<Query, Response>> {
    const handlersMap = new Map();

    queryHandlers.forEach((queryHandler) => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<Query, Response> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);
    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }
    return queryHandler;
  }
}
