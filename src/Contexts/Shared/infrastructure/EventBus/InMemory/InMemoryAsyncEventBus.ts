import { DomainEventSubscriber } from "../../../domain/DomainEventSubscriber.ts";
import { DomainEvent } from "../../../domain/DomainEvent.ts";
import { EventEmitterBus } from "../EventEmitterBus.ts";
import { EventBus } from "../../../domain/eventBus.ts";
import { Inject, Service } from "di/mod.ts";
import { Types } from "../../../domain/types.ts";
import { DomainEventMapping } from "../DomainEventMapping.ts";


@Service()
export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;
  private subscribers: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;

  constructor(
    @Inject(Types.Subscribers) subscribers: Array<
      DomainEventSubscriber<DomainEvent>>,
  ) {
    this.bus = new EventEmitterBus(subscribers);
    this.subscribers = new Map();
  }

  async start(): Promise<void> {
    //const event = this.deserializer!.deserialize(MessageChannel.content.toString());
  }

  async publish(events: DomainEvent[]): Promise<void> {
    await this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}

}
