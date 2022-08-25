import { beforeEach, describe, it } from "testing/bdd.ts";
import { CreateUserCommandHandler } from "../../../../../src/Contexts/Membership/Users/application/Create/CreateUserCommandHandler.ts";
import { UserCreator } from "../../../../../src/Contexts/Membership/Users/application/Create/UserCreator.ts";
import { EventBus } from "../../../../../src/Contexts/Shared/domain/eventBus.ts";
import { UserMother } from "../domain/UserMother.ts";
import EventBusMock from "../__mocks__/EventBusMock.ts";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock.ts";
import { CreateUserCommandMother } from "./CreateUserCommand.ts";

let repository: UserRepositoryMock;
let handler: CreateUserCommandHandler;

const eventBus: EventBus = new EventBusMock();

beforeEach(() => {
  repository = new UserRepositoryMock();
  const creator = new UserCreator(repository, eventBus);
  handler = new CreateUserCommandHandler(creator);
});

describe("UserCreator", () => {
  it("should create a valid user", async () => {
    const command = CreateUserCommandMother.random();
    await handler.handle(command);

    const user = UserMother.fromCommand(command);
    repository.assertLastSavedUserIs(user);
  });
});
