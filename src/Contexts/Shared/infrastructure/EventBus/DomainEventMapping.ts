import { DomainEventClass, DomainEvent } from "/src/Contexts/Shared/domain/DomainEvent.ts";
import { DomainEventSubscriber } from "/src/Contexts/Shared/domain/DomainEventSubscriber.ts";

export type Mapping = Map<string, DomainEventClass>;

export class DomainEventMapping {
  private mapping: Mapping;

  constructor(mapping: DomainEventSubscriber<DomainEvent>[]) {
    this.mapping = mapping.reduce(
      this.eventsExtractor(),
      new Map<string, DomainEventClass>(),
    );
  }

  private eventsExtractor() {
    return (map: Mapping, subscriber: DomainEventSubscriber<DomainEvent>) => {
      subscriber.subscribedTo().forEach(this.eventNameExtractor(map));
      return map;
    };
  }

  private eventNameExtractor(
    map: Mapping,
  ): (domainEvent: DomainEventClass) => void {
    return (domainEvent) => {
      const eventName = domainEvent.EVENT_NAME;
      map.set(eventName, domainEvent);
    };
  }

  for(name: string) {
    const domainEvent = this.mapping.get(name);

    if (!domainEvent) {
      return;
    }

    return domainEvent;
  }
}
