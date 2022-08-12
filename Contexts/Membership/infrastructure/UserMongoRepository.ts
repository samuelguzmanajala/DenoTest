import {MongoRepository} from "../../Shared/infrastructure/persistence/mongo/MongoRepository.ts";
import {User} from "../domain/User.ts";
import {UserRepository} from "../domain/UserRepository.ts";
import {UserId} from "../domain/value-object/UserId.ts";
import {Nullable} from "../../Shared/domain/Nullable.ts";
import {Inject, Service} from '../../../dependencies/deps.ts';
import {MongoClient} from "https://deno.land/x/mongo@v0.31.0/src/client.ts";


@Service()
export class UserMongoRepository extends MongoRepository<User> implements UserRepository {


    constructor(
        @Inject('client')
        client: Promise<MongoClient>) {
        super(client);
    }

    public save(user: User): Promise<void> {
        return this.persist(user.id.value, user);
    }

    public async search(id: UserId): Promise<Nullable<User>> {
        const collection = await this.collection();
        const document = await collection.findOne({ _id: id.value });
        return document ? User.fromPrimitives({ ...(document as object), id: id.value }) : null;
    }

    public delete(id: UserId): Promise<void> {
        console.log(id);
        return Promise.resolve(undefined);
    }

    update(user: User): Promise<void> {
        return Promise.resolve(undefined);
    }
    protected moduleName(): string {
        return 'users';
    }

}

