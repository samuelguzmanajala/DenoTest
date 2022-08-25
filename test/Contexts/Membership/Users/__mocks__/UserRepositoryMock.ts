import { UserRepository } from "../../../../../src/Contexts/Membership/Users/domain/UserRepository.ts";
import { spy } from "testing/mock.ts";
import { User } from "../../../../../src/Contexts/Membership/Users/domain/User.ts";
import { UserId } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserId.ts";
import { Nullable } from "../../../../../src/Contexts/Shared/domain/Nullable.ts";
import { assertEquals, assertInstanceOf } from "testing/asserts.ts";
import { UserNameMother } from "../domain/UserNameMother.ts";
import { UserPasswordMother } from "../domain/UserPasswordMother.ts";
import { UserMailMother } from "../domain/UserMailMother.ts";

export class UserRepositoryMock implements UserRepository {
  private mockSave = spy();

  private mockSearch = spy((id: UserId) => {
    if (Math.random() > 0.5) {
      return new User(
        id,
        UserNameMother.random(),
        UserPasswordMother.random(),
        UserMailMother.random(),
      );
    } else {
      return null;
    }
  });

  private mockSearchAll = spy(() => {
    return [];
  });

  private mockUpdate = spy();
  private mockDelete = spy();

  async save(user: User): Promise<void> {
    await this.mockSave(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const lastSavedUser = this.mockSave.calls[this.mockSave.calls.length - 1]
      .args[0] as User;
    assertInstanceOf(lastSavedUser, User);
    assertEquals(lastSavedUser.toPrimitives(), expected.toPrimitives());
  }

  async search(id: UserId): Promise<Nullable<User>> {
    return await this.mockSearch(id);
  }

  assertLastSearchedUserIs(expected: UserId): void {
    const id = this.mockSearch.calls[this.mockSearch.calls.length - 1]
      .args[0] as UserId;
    assertEquals(id, expected);
  }

  async searchAll(): Promise<User[]> {
    return await this.mockSearchAll();
  }
  async delete(id: UserId): Promise<void> {
    await this.mockDelete(id);
  }
  async update(user: User): Promise<void> {
    await this.mockUpdate(user);
  }
}
