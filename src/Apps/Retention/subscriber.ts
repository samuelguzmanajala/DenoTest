import { DomainEvent } from "../../Contexts/Shared/domain/DomainEvent.ts";
import { DomainEventSubscriber } from "../../Contexts/Shared/domain/DomainEventSubscriber.ts";
import { EventBus } from "../../Contexts/Shared/domain/eventBus.ts";
import { Types } from "../../Contexts/Shared/domain/types.ts";
import container from "./dependency-injection/Campaign/container.ts";


export function registerSubscribers(){
    const eventBus = container.get(EventBus) as EventBus;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    const subscribersEventSubscribers = container.get(Types.domainEventSubscriber) as DomainEventSubscriber<DomainEvent>;
    subscribers.push(subscribersEventSubscribers);
    eventBus.addSubscribers(subscribers);
    eventBus.start();
}