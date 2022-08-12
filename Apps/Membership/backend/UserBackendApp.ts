import {DomainEvent} from "../../../Contexts/Shared/domain/DomainEvent.ts";
import {DomainEventSubscriber} from "../../../Contexts/Shared/domain/DomainEventSubscriber.ts";
import {DomainEventMapping} from "../../../Contexts/Shared/infrastructure/EventBus/DomainEventMapping.ts";
import {EventBus} from "../../../Contexts/Shared/domain/eventBus.ts";
import {Server} from "./server.ts";
import {container} from "./dependency-injection/Container.ts";
export class UserBackendApp{
    server?: Server;
    async start(): Promise<void> {
        const port = Deno.env.get("PORT") || "3000";
        this.server = new Server(port);
        await this.registerSubscribers();
        return await this.server.listen();
    }
    private async registerSubscribers() {
        const eventBus:EventBus = container.get(EventBus);
        await eventBus.start();

    }
}