import { User } from "../../../../../src/Contexts/Membership/Users/domain/User.ts";
import { UserCreatedDomainEvent } from "../../../../../src/Contexts/Membership/Users/domain/UserCreatedDomainEvent.ts";

export class UserCreateDomainEventMother {
  static create({ id, eventId, name, password, mail, ocurredOn }: {
    id: string;
    eventId?: string;
    name: string;
    password: string;
    mail: string;
    ocurredOn?: Date;
  }): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      id,
      eventId,
      name,
      password,
      mail,
      ocurredOn,
    });
  }

  static fromUser(user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      id: user.id.value,
      name: user.name.value,
      password: user.password.value,
      mail: user.mail.value,
    });
  }
}
