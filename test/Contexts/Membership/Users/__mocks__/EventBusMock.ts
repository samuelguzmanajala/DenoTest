import { assertEquals, assertFalse } from "testing/asserts.ts";
import { spy } from 'testing/mock.ts';
import { DomainEvent } from "../../../../../src/Contexts/Shared/domain/DomainEvent.ts";
import { DomainEventSubscriber } from "../../../../../src/Contexts/Shared/domain/DomainEventSubscriber.ts";
import { EventBus } from "../../../../../src/Contexts/Shared/domain/eventBus.ts";
import { DomainEventMapping } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping.ts";

export default class EventBusMock implements EventBus {
  private publishSpy = spy();

  async publish(events: DomainEvent[]) {
    await this.publishSpy(events);
  }

  async start(): Promise<void> {}
  addSubscribers(_subscribers: DomainEventSubscriber<DomainEvent>[]): void {}

  setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {}

  asssertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.calls;
    assertFalse(this.publishSpy.calls.length <= 0);
    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent: DomainEvent = lastPublishSpyCall
      .args[0][0] as DomainEvent;
    assertEquals(
      this.getDataFromDomainEvent(lastPublishedEvent),
      this.getDataFromDomainEvent(expectedEvent),
    );
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event;
    return attributes;
  }
}
