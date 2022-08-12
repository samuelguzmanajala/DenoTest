import {ServiceCollection} from "../../../../dependencies/deps.ts";
import {UserRepository} from "../../../../Contexts/Membership/domain/UserRepository.ts";
import {UserMongoRepository} from "../../../../Contexts/Membership/infrastructure/UserMongoRepository.ts";
import {MongoConfigFactory} from "../../../../Contexts/Membership/Shared/infrastructure/persistence/mongo/MongoConfigFactory.ts";
import {MongoClientFactory} from "../../../../Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory.ts";
import MongoConfig from "../../../../Contexts/Shared/infrastructure/persistence/mongo/MongoConfig.ts";
import HoustonLogger from "../../../../Contexts/Shared/infrastructure/HoustonLogger.ts";
import Logger from "../../../../Contexts/Shared/domain/Logger.ts";
import {InMemoryAsyncEventBus} from "../../../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus.ts";
import {EventBus} from "../../../../Contexts/Shared/domain/eventBus.ts";
import {UserCreator} from "../../../../Contexts/Membership/application/Create/UserCreator.ts";

const serviceCollection = new ServiceCollection();

serviceCollection.addTransientDynamic('MongoConfig', MongoConfigFactory.createConfig);
await serviceCollection.addStatic('client', await MongoClientFactory.createClient('membership',serviceCollection.get('MongoConfig')));
serviceCollection.addTransient(UserMongoRepository);

serviceCollection.addStatic('subscribers', []);
serviceCollection.addTransient(InMemoryAsyncEventBus);

//Interfaces or Abstract
serviceCollection.addTransient(UserRepository, UserMongoRepository);
serviceCollection.addTransient(Logger, HoustonLogger);
serviceCollection.addTransient(EventBus, InMemoryAsyncEventBus);
//Services
serviceCollection.addTransient(UserCreator);

export {serviceCollection as container};