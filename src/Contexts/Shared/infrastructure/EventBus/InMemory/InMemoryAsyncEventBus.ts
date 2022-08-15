import {DomainEventSubscriber} from "../../../domain/DomainEventSubscriber.ts";
import {DomainEvent} from "../../../domain/DomainEvent.ts";
import {EventEmitterBus} from "../EventEmitterBus.ts";
import {EventBus} from "../../../domain/eventBus.ts";
import {DomainEventMapping} from "../DomainEventMapping.ts";
import {Inject, Service} from "../../../../../dependencies/deps.ts";
import {Types} from "../../../domain/types.ts";



@Service()
export class InMemoryAsyncEventBus implements EventBus {
    private bus: EventEmitterBus;

    constructor(
        @Inject(Types.Subscribers)
        subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
        this.bus = new EventEmitterBus(subscribers);
    }

    async start(): Promise<void> {}

    async publish(events: DomainEvent[]): Promise<void> {
        await this.bus.publish(events);
    }

    addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
        this.bus.registerSubscribers(subscribers);
    }

    setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}
}
