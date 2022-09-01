import { EventBus } from "../../../Contexts/Shared/domain/eventBus.ts";
import { Server } from "./server.ts";
import container from "./dependency-injection/Container.ts";
import { DomainEventSubscriber } from "../../../Contexts/Shared/domain/DomainEventSubscriber.ts";
import { DomainEvent } from "../../../Contexts/Shared/domain/DomainEvent.ts";
import { DomainEventMapping } from "../../../Contexts/Shared/infrastructure/EventBus/DomainEventMapping.ts";
import { Types } from "../../../Contexts/Shared/domain/types.ts";
export class UserBackendApp {
  server?: Server;
  async start(): Promise<void> {
    const port = Deno.env.get("PORT") || "3000";
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }
  private async registerSubscribers() {
    const eventBus: EventBus = container.get(Types.EventBus);

    //TODO: Fix subscriberDefinition
    const subscriberDefinition = container.get(Types.domainEventSubscriber) as Array<DomainEventSubscriber<DomainEvent>>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];
    subscriberDefinition.forEach((domainEventSubscriber) => subscribers.push(domainEventSubscriber));

    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}
