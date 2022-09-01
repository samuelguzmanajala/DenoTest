import { DomainEvent, DomainEventClass } from "./DomainEvent.ts";


export abstract class DomainEventSubscriber<T extends DomainEvent> {
  abstract subscribedTo(): Array<DomainEventClass>;
  abstract on(domainEvent: T): Promise<void>;
}
