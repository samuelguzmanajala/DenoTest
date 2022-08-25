import { assertEquals } from "testing/asserts.ts";
import { User } from "../../../../../src/Contexts/Membership/Users/domain/User.ts";
import { CreateUserCommandMother } from "../application/CreateUserCommand.ts";
import { UserMother } from "./UserMother.ts";

Deno.test("User", () => {
  const command = CreateUserCommandMother.random();
  const user: User = UserMother.fromCommand(command);
  assertEquals(user.id.value, command.id);
});
