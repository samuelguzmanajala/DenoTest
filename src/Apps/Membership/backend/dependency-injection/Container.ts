import {
  ServiceCollection,
  ServiceMultiCollection,
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
import { ConsoleTransport } from "https://x.nest.land/Houston@1.0.0/mod.ts";
import { CreateUserCommandHandler } from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommandHandler.ts";
import { DeleteUseCommandHandler } from "../../../../Contexts/Membership/Users/application/Delete/DeleteUseCommandHandler.ts";

const container = new ServiceCollection();
container.addTransientDynamic(
  Types.MongoConfig,
  MongoConfigFactory.createConfig,
);
container.addStatic(Types.Subscribers, []);
container.addStatic(
  Types.Client,
  MongoClientFactory.createClient(
    "membership",
    container.get(Types.MongoConfig),
  ),
);

container.addTransient(UserMongoRepository);
container.addTransient(EventBus, InMemoryAsyncEventBus);
container.addTransient(UserRepository, UserMongoRepository);
container.addTransient(Logger, HoustonLogger);
container.addTransient(UserCreator);
container.addTransient(UsersFinder);
container.addTransient(UserRemover);

/**********************************BUS**********************************/

//User
const container2 = new ServiceCollection();
const container3 = new ServiceCollection();

container2.addStatic(
  Types.commandHandler,
  new CreateUserCommandHandler(container.get(UserCreator)),
);
container3.addStatic(
  Types.commandHandler,
  new DeleteUseCommandHandler(container.get(UserRemover)),
);

container.addStatic(Types.commandHandler, [
  container2.get(Types.commandHandler),
  container3.get(Types.commandHandler),
]);
console.log(container.get(Types.commandHandler));

//Shared
container.addStatic(
  Types.commandHandlersInformation,
  new CommandHandlersInformation([]),
);

container.addStatic(
  Types.commandBus,
  new InMemoryCommandBus(container.get(Types.commandHandlersInformation)),
);

export default container;
