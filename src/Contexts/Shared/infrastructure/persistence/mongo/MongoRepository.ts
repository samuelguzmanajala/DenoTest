import { AggregateRoot } from "../../../domain/AggregateRoot.ts";
import { Collection, MongoClient } from 'mongo/mod.ts';

export abstract class MongoRepository<T extends AggregateRoot> {
    constructor(
        private _client: Promise<MongoClient>
    ) {}

    protected abstract moduleName(): string;
  
    protected client(): Promise<MongoClient> {
        return this._client;
    }
  
    protected async collection(): Promise<Collection<unknown>> {
        const client: MongoClient = await this.client();
        return client.database().collection(this.moduleName());
    }
  
    protected async persist(id: string, aggregateRoot: T): Promise<void> {
      const collection = await this.collection();
  
      const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };
  
      await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
    }
}