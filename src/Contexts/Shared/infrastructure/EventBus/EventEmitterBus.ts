import { Emitter } from 'emmiter/index.js';
import {DomainEvent} from "../../../../Contexts/Shared/domain/DomainEvent.ts";
import {DomainEventSubscriber} from "../../../../Contexts/Shared/domain/DomainEventSubscriber.ts";

export class EventEmitterBus extends Emitter {
    constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
        super();
        this.registerSubscribers(subscribers);
    }

    registerSubscribers(subscribers?: DomainEventSubscriber<DomainEvent>[]) {
        subscribers?.map(subscriber => {
            this.registerSubscriber(subscriber);
        });
    }

    private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>) {
        subscriber.subscribedTo().map(event => {
            this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
        });
    }

    publish(events: DomainEvent[]): void {
        events.map(event => this.emit(event.eventName, event));
    }
}
