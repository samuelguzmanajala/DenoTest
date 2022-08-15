import {DomainEventMapping} from "../infrastructure/EventBus/DomainEventMapping.ts";
import {DomainEvent} from "./DomainEvent.ts";
import {DomainEventSubscriber} from "./DomainEventSubscriber.ts";

export abstract class EventBus{
    abstract setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
    abstract publish(events: Array<DomainEvent>): Promise<void>;
    abstract addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
    abstract start(): Promise<void>;
}