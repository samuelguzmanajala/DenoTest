import { User } from "./User.ts";
import { UserId } from "./value-object/UserId.ts";
import { Nullable } from "../../../Shared/domain/Nullable.ts";

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract search(id: UserId): Promise<Nullable<User>>;
  abstract searchAll(): Promise<Array<User>>;
  abstract delete(id: UserId): Promise<void>;
  abstract update(user: User): Promise<void>;
}
