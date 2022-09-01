import { UserCreatedDomainEvent } from "../../../Membership/Users/domain/UserCreatedDomainEvent.ts";
import { DomainEventClass } from "../../../Shared/domain/DomainEvent.ts";
import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber.ts";
import { EmailAddress } from "../domain/EmailAddress.ts";
import SendWelcomeUserEmail from "./SendWelcomeUserEmail.ts";

export default class SendWelcomeUserEmailOnUserRegistered
  implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private sendWelcomeUserEmail: SendWelcomeUserEmail) {
    //console.log(sendWelcomeUserEmail);
  }

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }
  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const userEmailAddress = new EmailAddress(domainEvent.mail)
    await this.sendWelcomeUserEmail.run(userEmailAddress);
  }
}
