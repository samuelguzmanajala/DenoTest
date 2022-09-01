import {DomainEvent} from "../../../domain/DomainEvent.ts";
import {DomainEventSubscriber} from "../../../domain/DomainEventSubscriber.ts";
import {EventBus} from "../../../domain/eventBus.ts";
import {DomainEventMapping} from "../DomainEventMapping.ts";
import {
  AmqpChannel,
  AmqpConnection,
  connect,
} from "amqp/mod.ts";
import Logger from "../../../domain/Logger.ts";
import {DomainEventJsonDeserializer} from "../DomainEventJsonDeserializer.ts";
import {Service, Inject} from 'di/mod.ts';
import type RabbitMqConfig from './RabbitMqConfig.ts';
import {Types} from "../../../domain/types.ts";
import container from "../../../../../Apps/Membership/backend/dependency-injection/Container.ts";

@Service()
export default class RabbitMqEventBus implements EventBus {
  private connection!: AmqpConnection;
  private deserializer?: DomainEventJsonDeserializer;
  private subscribers!: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;
  private channel!: AmqpChannel;

  constructor(@Inject(Logger) private logger: Logger, @Inject(Types.rabbitConfig) private config: RabbitMqConfig) {
    this.subscribers = new Map();
  }

  async init() {
    this.connection = await connect(`amqp://${this.config.user}:${this.config.password}@${this.config.host}`);
    this.channel = await this.connection.openChannel();
    await this.channel.declareExchange({exchange: this.config.exchange, type: 'fanout', durable: false});
    await this.channel.declareQueue({queue: this.config.queue});
    this.subscribers = new Map();

  }


  async start(): Promise<void> {
    if (!this.deserializer) {
      throw new Error('RabbitMqEventBus has not beign properly initialized, deserializer is missing');
    }
    await this.channel.consume({queue: this.config.queue ,noAck: false},
      async (args, props, data) => {
        const event = this.deserializer!.deserialize(new TextDecoder().decode(data));
        if (event) {
          const subscribers = this.subscribers.get(event.eventName);
          if (subscribers && subscribers.length) {
            const subscribersNames = subscribers.map(subscriber => subscriber.constructor.name);
            this.logger.info(`[RabbitMqEventBus] Message processed: ${event.eventName} by ${subscribersNames}`);
            const subscribersExecutions = subscribers.map(subscriber => subscriber.on(event));
            await Promise.all(subscribersExecutions);
          }
        }
        await this.channel.ack({deliveryTag: args.deliveryTag});
      });

    this.connection.closed().then(() => {
      console.log("Closed peacefully");
    }).catch((error) => {
      console.error("Connection closed with error");
      console.error(error.message);
    });
  }


  async publish(events: DomainEvent[]): Promise<void> {
    const executions: any = [];
    events.map((event) => {
      const message = {
        data: {
          type: event.eventName,
          occurred_on: event.occurredOn,
          id: event.eventId,
          attributes: event.toPrimitive(),
        },
        meta: {},
      };
      this.logger.info(
        `[RabbitMqEventBus] Events to be published: ${event.eventName}`,
      );
      executions.push(this.channel.publish({routingKey: this.config.queue}, {contentType: "application/json"}, new TextEncoder().encode(JSON.stringify(message))));
    });
    await Promise.all(executions);
  }

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
    subscribers.map(subscriber => {
      this.addSubscriber(subscriber);
    });
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {
    this.deserializer = new DomainEventJsonDeserializer(domainEventMapping);
  }

  private addSubscriber(subscriber: DomainEventSubscriber<DomainEvent>): void {
    subscriber.subscribedTo().map(event => {
      const eventName = event.EVENT_NAME;
      if (this.subscribers.has(eventName)) {
        this.subscribers.get(eventName)!.push(subscriber);
      } else {
        this.subscribers.set(eventName, [subscriber]);
      }
    });
  }
}
