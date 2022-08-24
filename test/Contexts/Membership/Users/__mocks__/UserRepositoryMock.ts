import { UserRepository } from "../../../../../src/Contexts/Membership/Users/domain/UserRepository.ts";
import { returnsArgs, returnsNext, spy, stub } from "testing/mock.ts";
import { customPromisifyArgs } from "https://deno.land/std@0.152.0/node/internal/util.mjs";
import { User } from "../../../../../src/Contexts/Membership/Users/domain/User.ts";
import { UserId } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserId.ts";
import { UserName } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserName.ts";
import { UserPassword } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserPassword.ts";
import { UserMail } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserMail.ts";
import { UsersFinder } from "../../../../../src/Contexts/Membership/Users/application/searchAll/UsersFinder.ts";
import { Nullable } from "../../../../../src/Contexts/Shared/domain/Nullable.ts";

async function mocksavefn(user:User):Promise<void>{}
async function mockSearchfn(id: UserId): Promise<Nullable<User>>{
  return await new User(id,
  new UserName('test'),
  new UserPassword('12345678'),
  new UserMail('test@gmail.com')
  );
}
async function deletefn(id: UserId): Promise<void> {}
async function updatefn(user:User): Promise<void> {}
async function mocksearchAllfn(): Promise<User[]> {
    const users:User[] = await [new User(
        new UserId('002061f9-1735-4ae3-9634-b5b2a5541313'),
        new UserName('test'),
        new UserPassword('12345678'),
        new UserMail('test@gmail.com')
        )];
    return users;
}


export class UserRepositoryMock implements UserRepository {
  async save(user: User): Promise<void> {
    await mocksavefn(user);
  }
  async search(id: UserId): Promise<Nullable<User>> {
    return await mockSearchfn(id);
  }
  async searchAll(): Promise<User[]> {
    return await mocksearchAllfn();
  }
  async delete(id: UserId): Promise<void> {
    await deletefn(id);
  }
  async update(user: User): Promise<void> {
    await updatefn(user);
  }
}
