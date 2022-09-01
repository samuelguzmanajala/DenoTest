import {
  ServiceCollection,
} from "servicecollection/mod.ts";
import { MongoClientFactory } from "../../../../Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory.ts";
import { Types } from "../../../../Contexts/Shared/domain/types.ts";
import { MongoConfigFactory } from "../../../../Contexts/Membership/Shared/infrastructure/persistence/mongo/MongoConfigFactory.ts";
import { UserMongoRepository } from "../../../../Contexts/Membership/Users/infrastructure/UserMongoRepository.ts";
import { EventBus } from "../../../../Contexts/Shared/domain/eventBus.ts";
import {
  InMemoryAsyncEventBus,
} from "../../../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus.ts";
import { UserCreator } from "../../../../Contexts/Membership/Users/application/Create/UserCreator.ts";
import { UserRepository } from "../../../../Contexts/Membership/Users/domain/UserRepository.ts";
import HoustonLogger from "../../../../Contexts/Shared/infrastructure/HoustonLogger.ts";
import Logger from "../../../../Contexts/Shared/domain/Logger.ts";
import { UsersFinder } from "../../../../Contexts/Membership/Users/application/searchAll/UsersFinder.ts";
import { UserRemover } from "../../../../Contexts/Membership/Users/application/Delete/UserRemover.ts";
import { CommandHandlersInformation } from "../../../../Contexts/Shared/infrastructure/CommandBus/CommandHandlersInformation.ts";
import { InMemoryCommandBus } from "../../../../Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus.ts";
import { CreateUserCommandHandler } from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommandHandler.ts";
import { DeleteUseCommandHandler } from "../../../../Contexts/Membership/Users/application/Delete/DeleteUseCommandHandler.ts";
import SendWelcomeUserEmail from "../../../../Contexts/Retention/Campaign/application/SendWelcomeUserEmail.ts";
import SendWelcomeUserEmailOnUserRegistered from "../../../../Contexts/Retention/Campaign/application/SendWelcomeUserEmailOnUserRegistered.ts";
import { EmailSender } from "../../../../Contexts/Retention/Campaign/domain/EmailSender.ts";
import FakeEmailSender from "../../../../Contexts/Retention/Campaign/infrastructure/FakeEmailSender.ts";
import { CommandBus } from "../../../../Contexts/Shared/domain/CommandBus.ts";
import { CreateUserCommand } from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import { types } from "https://deno.land/std@0.152.0/media_types/mod.ts";
import { Command } from "../../../../Contexts/Shared/domain/Command.ts";
import { UserPutController } from "../controllers/UserPutController.ts";
import { RabbitMqConfigFactory } from "../../../../Contexts/Membership/Shared/infrastructure/eventBus/RabbitMq/RabbitMqConfigFactory.ts";
import RabbitMqEventBus from "../../../../Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus.ts";

const container = new ServiceCollection();
container.addTransientDynamic(
  Types.MongoConfig,
  MongoConfigFactory.createConfig,
);

container.addTransientDynamic(Types.rabbitConfig, RabbitMqConfigFactory.createConfig);

container.addStatic(Types.Subscribers, []);
container.addStatic(
  Types.Client,
  MongoClientFactory.createClient(
    "membership",
    container.get(Types.MongoConfig),
  ),
);



container.addTransient(UserMongoRepository);
container.addTransient(UserRepository, UserMongoRepository);
container.addTransient(Logger, HoustonLogger);
container.addTransient(EventBus, RabbitMqEventBus);

container.addTransient(UserCreator);
container.addTransient(UsersFinder);
container.addTransient(UserRemover);
container.addTransient(RabbitMqEventBus);
const eventBus = container.get(EventBus);
if(container.get(EventBus) instanceof  RabbitMqEventBus){
  await (eventBus as RabbitMqEventBus).init();
}

container.addStatic(Types.EventBus,eventBus);

/**********************************CommandQueryBUS**********************************/

//Notification
container.addStatic(Types.createUserCommandHandler, new CreateUserCommandHandler(container.get(UserCreator)));
container.addTransient(CreateUserCommandHandler);
container.addStatic(Types.commandHandlersInformation, new CommandHandlersInformation([container.get(Types.createUserCommandHandler)]));
container.addTransient(CommandBus,InMemoryCommandBus);
container.addTransient(InMemoryCommandBus);
container.addTransient(EmailSender, FakeEmailSender);
container.addStatic(Types.sendWelcomeUserEmail, new SendWelcomeUserEmail(container.get(EmailSender)));
container.addStatic(Types.domainEventSubscriber, [new SendWelcomeUserEmailOnUserRegistered(container.get(Types.sendWelcomeUserEmail))]);


//Controllers


container.addStatic(UserPutController, new UserPutController(container.get(CommandBus)));


export default container;
