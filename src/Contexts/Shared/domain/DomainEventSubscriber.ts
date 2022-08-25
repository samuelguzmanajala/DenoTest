import { DomainEvent, DomainEventClass } from "./DomainEvent.ts";

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;
  on(domainEvent: T): Promise<void>;
}
