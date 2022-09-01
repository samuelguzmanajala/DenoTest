import { augmentConfiguration} from "deno_config/mod.ts";
export const Config = {
  mongo: {
    url: {
      doc: "The Mongo connection URL",
      format: String,
      env: "MONGO_URL",
      default:
        "mongodb+srv://samuel:contrasena@cluster0.hechiqz.mongodb.net/?authMechanism=SCRAM-SHA-1",
    },
    cors: {
      allowed: false,
      allowedHost: [],
    },
  },
  rabbitMQ: {
    host: {
      default: 'localhost'
    },
    user: {
      default: 'guest'
    },
    password: {
      default: 'guest'
    },
    queue: {
      default: 'Membership-DomainEvents'
    },
    exchange: {
      default: 'DomainEvents'
    }
  }
};
//default: 'mongodb+srv://samuel:contrasena@cluster0.hechiqz.mongodb.net/?authMechanism=SCRAM-SHA-1?retryWrites=true&w=majority'
augmentConfiguration(Config);