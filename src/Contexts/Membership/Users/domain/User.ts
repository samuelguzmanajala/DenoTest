import { UserPassword } from "./value-object/UserPassword.ts";
import { AggregateRoot } from "../../../Shared/domain/AggregateRoot.ts";
import { UserId } from "./value-object/UserId.ts";
import { UserName } from "./value-object/UserName.ts";
import { UserMail } from "./value-object/UserMail.ts";
import { UserCreator } from "../application/Create/UserCreator.ts";
import { UserCreatedDomainEvent } from "./UserCreatedDomainEvent.ts";

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: UserName;
  readonly password: UserPassword;
  readonly mail: UserMail;

  constructor(
    id: UserId,
    name: UserName,
    password: UserPassword,
    mail: UserMail,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.password = password;
    this.mail = mail;
  }

  static create(
    id: UserId,
    name: UserName,
    password: UserPassword,
    mail: UserMail,
  ): User {
    const user = new User(id, name, password, mail);
    
    user.record(new UserCreatedDomainEvent({
      id: user.id.value,
      name: user.name.value,
      password: user.password.value,
      mail: user.mail.value
    })
    );
    return user;
  }

  static fromPrimitives(plainData: Record<string, any>): User {
    return new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
      new UserPassword(plainData.password),
      new UserMail(plainData.mail),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      password: this.password.value,
      mail: this.mail.value,
    };
  }
}
