import RabbitMqConfig from "../../../../../Shared/infrastructure/EventBus/RabbitMq/RabbitMqConfig.ts";
import { Config } from "../../config/config.ts";

export class RabbitMqConfigFactory {
  static createConfig(): RabbitMqConfig {
    return {
      user: Config.rabbitMQ.user.default,
      password: Config.rabbitMQ.password.default,
      host: Config.rabbitMQ.host.default,
      queue: Config.rabbitMQ.queue.default,
      exchange: Config.rabbitMQ.exchange.default
    }
  }
}