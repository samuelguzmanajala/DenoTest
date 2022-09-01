import { ServiceCollection } from "di/mod.ts";
import SendWelcomeUserEmail from "../../../../Contexts/Retention/Campaign/application/SendWelcomeUserEmail.ts";
import SendWelcomeUserEmailOnUserRegistered from "../../../../Contexts/Retention/Campaign/application/SendWelcomeUserEmailOnUserRegistered.ts";
import { EmailSender } from "../../../../Contexts/Retention/Campaign/domain/EmailSender.ts";
import FakeEmailSender from "../../../../Contexts/Retention/Campaign/infrastructure/FakeEmailSender.ts";
import { EventBus } from "../../../../Contexts/Shared/domain/eventBus.ts";
import Logger from "../../../../Contexts/Shared/domain/Logger.ts";
import { Types } from "../../../../Contexts/Shared/domain/types.ts";
import { InMemoryAsyncEventBus } from "../../../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus.ts";
import HoustonLogger from "../../../../Contexts/Shared/infrastructure/HoustonLogger.ts";
import {SMTPClientEmailSender} from "../../../../Contexts/Retention/Campaign/infrastructure/SMTPClientEmailSender.ts";

export class CampaignDI {
    constructor(readonly container: ServiceCollection){
        container.addTransient(EmailSender,SMTPClientEmailSender);
        container.addTransient(FakeEmailSender);
        container.addStatic(Types.sendWelcomeUserEmail, new SendWelcomeUserEmail(container.get(EmailSender)));
        container.addStatic(Types.sendWelcomeUserEmailOnUserRegistered, new SendWelcomeUserEmailOnUserRegistered(container.get(Types.sendWelcomeUserEmail)));
        container.addStatic(Types.domainEventSubscriber, container.get(Types.sendWelcomeUserEmailOnUserRegistered));
        container.addStatic(Types.Subscribers, []);
        container.addTransient(EventBus, InMemoryAsyncEventBus);
        container.addTransient(Logger, HoustonLogger);
    }
}