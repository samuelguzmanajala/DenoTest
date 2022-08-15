import {ServiceCollection} from "../../../../dependencies/deps.ts";
import {MongoClientFactory} from "../../../../Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory.ts";
import {Types} from "../../../../Contexts/Shared/domain/types.ts";
import {MongoConfigFactory} from "../../../../Contexts/Membership/Shared/infrastructure/persistence/mongo/MongoConfigFactory.ts";
import {UserMongoRepository} from "../../../../Contexts/Membership/Users/infrastructure/UserMongoRepository.ts";
import {EventBus} from "../../../../Contexts/Shared/domain/eventBus.ts";
import {
    InMemoryAsyncEventBus
} from "../../../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus.ts";
import {UserCreator} from "../../../../Contexts/Membership/Users/application/Create/UserCreator.ts";
import {UserRepository} from "../../../../Contexts/Membership/Users/domain/UserRepository.ts";
import HoustonLogger from "../../../../Contexts/Shared/infrastructure/HoustonLogger.ts";
import Logger from "../../../../Contexts/Shared/domain/Logger.ts";

const container = new ServiceCollection();
container.addTransientDynamic(Types.MongoConfig, MongoConfigFactory.createConfig);
container.addStatic(Types.Subscribers, []);
container.addStatic(Types.Client, MongoClientFactory.createClient('membership', container.get(Types.MongoConfig)));
container.addTransient(UserMongoRepository);
container.addTransient(EventBus, InMemoryAsyncEventBus);
container.addTransient(UserRepository, UserMongoRepository);
container.addTransient(Logger, HoustonLogger);
container.addTransient(UserCreator);

export default container;