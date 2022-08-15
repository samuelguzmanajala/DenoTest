import MongoConfig from "../../../../../Shared/infrastructure/persistence/mongo/MongoConfig.ts";
import {Config} from "../../config/config.ts";
import {Service} from "../../../../../../dependencies/deps.ts";

@Service()
export class MongoConfigFactory {
    static createConfig(): MongoConfig{
        return {
            url: Config.url.default
        }
    }
}