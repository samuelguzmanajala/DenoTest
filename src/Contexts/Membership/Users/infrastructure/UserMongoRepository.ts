import {UserRepository} from "../domain/UserRepository.ts";
import {UserId} from "../domain/value-object/UserId.ts";
import {Service} from '../../../../dependencies/deps.ts';
import {MongoClient} from "https://deno.land/x/mongo@v0.31.0/src/client.ts";
import {MongoRepository} from "../../../Shared/infrastructure/persistence/mongo/MongoRepository.ts";
import {User} from "../domain/User.ts";
import {Nullable} from "../../../Shared/domain/Nullable.ts";
import {Inject} from "../../../../dependencies/deps.ts";
import {Types} from "../../../Shared/domain/types.ts";

@Service()
export class UserMongoRepository extends MongoRepository<User> implements UserRepository {


    constructor(@Inject(Types.Client)client: Promise<MongoClient>) {
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

    public async searchAll(): Promise<Array<User>> {
        const collection = await this.collection();
        const documents = await collection.find();
        return documents.map((document: any) => User.fromPrimitives({ ...(document as object), id: document._id }));
    }

    public async delete(id: UserId): Promise<void> {
        const collection = await this.collection();
        const document = await collection.deleteOne({ _id: id.value });
    }

    async update(user: User): Promise<void> {
    }
    protected moduleName(): string {
        return 'users';
    }

}

